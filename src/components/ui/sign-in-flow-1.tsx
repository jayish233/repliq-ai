"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { RepliqLogo } from "@/components/repliq-logo";
import { AuthUserChip } from "@/components/auth-user-chip";
import { useAuth } from "@/lib/auth/use-auth";
import type { AuthUser } from "@/lib/auth/types";
import { Eye, EyeOff } from "lucide-react";

type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number;
    type: string;
  };
};

interface ShaderProps {
  source: string;
  uniforms: Uniforms;
  maxFps?: number;
}

interface SignInPageProps {
  className?: string;
  initialMode?: "signin" | "signup";
}

export const CanvasRevealEffect = ({
  animationSpeed = 10,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[225, 224, 204]],
  containerClassName,
  dotSize,
  showGradient = true,
  reverse = false,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
  reverse?: boolean;
}) => {
  return (
    <div className={cn("h-full relative w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[225, 224, 204]]}
          dotSize={dotSize ?? 3}
          opacities={
            opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
          }
          shader={`
            ${reverse ? "u_reverse_active" : "false"}_;
            animation_speed_factor_${animationSpeed.toFixed(1)}_;
          `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 20,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}) => {
  const uniforms = React.useMemo(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];
    if (colors.length === 2) {
      colorsArray = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    } else if (colors.length === 3) {
      colorsArray = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
    }
    return {
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255,
        ]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
      u_reverse: {
        value: shader.includes("u_reverse_active") ? 1 : 0,
        type: "uniform1i",
      },
    };
  }, [colors, opacities, totalSize, dotSize, shader]);

  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse;

        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min1) / (max1 - min1);
        }

        void main() {
            vec2 st = fragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }

            float opacity = step(0.0, st.x);
            opacity *= step(0.0, st.y);

            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

            vec3 color = u_colors[int(show_offset * 6.0)];

            float animation_speed_factor = 0.5;
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);

            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);

            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);

            float current_timing_offset;
            if (u_reverse == 1) {
                current_timing_offset = timing_offset_outro;
                 opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            } else {
                current_timing_offset = timing_offset_intro;
                 opacity *= step(current_timing_offset, u_time * animation_speed_factor);
                 opacity *= clamp((1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            }

            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
      maxFps={60}
    />
  );
};

const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
}: {
  source: string;
  hovered?: boolean;
  maxFps?: number;
  uniforms: Uniforms;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();
    const material = ref.current.material as THREE.ShaderMaterial;
    if (material.uniforms.u_time) {
      material.uniforms.u_time.value = timestamp;
    }
    void maxFps;
  });

  const getUniforms = () => {
    const preparedUniforms: Record<string, { value: unknown; type?: string }> = {};

    for (const uniformName in uniforms) {
      const uniform = uniforms[uniformName];

      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
          break;
        case "uniform1i":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1i" };
          break;
        case "uniform3f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector3().fromArray(uniform.value as number[]),
            type: "3f",
          };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: (uniform.value as number[][]).map((v: number[]) =>
              new THREE.Vector3().fromArray(v)
            ),
            type: "3fv",
          };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value as number[]),
            type: "2f",
          };
          break;
        default:
          break;
      }
    }

    preparedUniforms.u_time = { value: 0, type: "1f" };
    preparedUniforms.u_resolution = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    };
    return preparedUniforms;
  };

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
      fragmentShader: source,
      uniforms: getUniforms(),
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });
  }, [size.width, size.height, source]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  );
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="group relative inline-flex h-5 items-center overflow-hidden text-sm">
      <div className="flex flex-col transition-transform duration-400 ease-out group-hover:-translate-y-1/2">
        <span className="text-zinc-400">{children}</span>
        <span className="text-white">{children}</span>
      </div>
    </Link>
  );
};

function MiniNavbar({
  mode,
  onModeChange,
}: {
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}) {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const signedIn = Boolean(user) || loading;

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);

    if (isOpen) {
      setHeaderShapeClass("rounded-2xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  const navLinksData = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Reconstruct", href: "/reconstruct/new" },
  ];

  const loginButton = (
    <button
      type="button"
      onClick={() => onModeChange("signin")}
      className={`w-full rounded-full border px-4 py-2 text-xs transition-colors sm:w-auto sm:text-sm ${
        mode === "signin"
          ? "border-white/40 bg-white/10 text-white"
          : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white"
      }`}
    >
      Log in
    </button>
  );

  const signupButton = (
    <div className="relative w-full sm:w-auto">
      <div className="pointer-events-none absolute -m-2 inset-0 hidden rounded-full bg-[#E1E0CC] opacity-40 blur-lg sm:block" />
      <button
        type="button"
        onClick={() => onModeChange("signup")}
        className={`relative z-10 w-full rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:w-auto sm:text-sm ${
          mode === "signup"
            ? "bg-white text-zinc-950"
            : "bg-linear-to-br from-[#E1E0CC] to-zinc-300 text-zinc-950 hover:from-white hover:to-[#E1E0CC]"
        }`}
      >
        Sign up
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-6 left-1/2 z-20 flex w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 flex-col items-center border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-2xl transition-[border-radius] sm:w-auto sm:px-6 ${headerShapeClass}`}
    >
      <div className="flex w-full items-center justify-between gap-x-4 sm:gap-x-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Repliq home">
          <RepliqLogo size={22} priority className="h-6 w-6" />
          <span className="hidden text-sm font-medium tracking-wide text-white sm:block">Repliq</span>
        </Link>

        <nav className="hidden items-center space-x-5 text-sm md:flex">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {signedIn ? (
            <AuthUserChip />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              {loginButton}
              {signupButton}
            </div>
          )}
        </div>

        <button
          className="flex h-8 w-8 items-center justify-center text-zinc-300 sm:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 sm:hidden ${
          isOpen ? "max-h-80 pt-4 opacity-100" : "pointer-events-none max-h-0 pt-0 opacity-0"
        }`}
      >
        <nav className="flex w-full flex-col items-center space-y-3 text-sm">
          {navLinksData.map((link) => (
            <Link key={link.href} href={link.href} className="w-full text-center text-zinc-400 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        {!signedIn && (
          <div className="mt-4 flex w-full flex-col gap-2">
            {loginButton}
            {signupButton}
          </div>
        )}
      </div>
    </header>
  );
}

function AccountAvatar({ user }: { user: AuthUser }) {
  if (user.picture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.picture}
        alt=""
        className="h-20 w-20 rounded-full object-cover ring-1 ring-white/15"
      />
    );
  }

  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E1E0CC] text-2xl font-semibold tracking-tight text-black">
      {user.name.slice(0, 1).toUpperCase()}
    </span>
  );
}

function SignedInAccount({
  user,
  onContinue,
  onLogout,
}: {
  user: AuthUser;
  onContinue: () => void;
  onLogout: () => void;
}) {
  return (
    <motion.div
      key="account"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8 text-center"
    >
      <div className="space-y-2">
        <p className="text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
          Account
        </p>
        <h1 className="text-[2.35rem] leading-[1.1] font-medium tracking-tight text-white">
          You&apos;re signed in
        </h1>
        <p className="text-lg font-light text-white/60">
          Continue into the studio or switch accounts.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-4">
          <AccountAvatar user={user} />
          <div className="min-w-0">
            <p className="truncate text-xl font-medium tracking-tight text-white">{user.name}</p>
            <p className="mt-1 truncate text-sm text-white/50">{user.email}</p>
            <p className="mt-2 text-[10px] font-medium tracking-[0.18em] text-white/35 uppercase">
              {user.provider === "google" ? "Google" : "Email"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-full bg-white py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          Continue to dashboard
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="w-full rounded-full border border-white/10 bg-white/5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
        >
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

export const SignInPage = ({ className, initialMode }: SignInPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, logout } = useAuth();
  const nextPath = searchParams.get("next") || "/dashboard";
  const oauthError = searchParams.get("error");
  const queryMode = searchParams.get("mode");

  const [mode, setMode] = useState<"signin" | "signup">(
    initialMode || (queryMode === "signup" ? "signup" : "signin")
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(
    oauthError === "config"
      ? "Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google sign-in."
      : oauthError
        ? "Google sign-in was cancelled or failed. Try again."
        : null
  );

  const finishToApp = () => {
    router.push(nextPath);
    router.refresh();
  };

  const playSuccess = () => {
    setReverseCanvasVisible(true);
    setTimeout(() => setInitialCanvasVisible(false), 50);
    setTimeout(() => setStep("success"), 1600);
  };

  const handleModeChange = (next: "signin" | "signup") => {
    setMode(next);
    setAuthError(null);
    setPassword("");
    setConfirmPassword("");
    router.replace(next === "signup" ? "/signup" : "/signin", { scroll: false });
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    window.location.href = `/api/auth/google?next=${encodeURIComponent(nextPath)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!password) {
      setAuthError("Password is required.");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setAuthError("Name is required.");
        return;
      }
      if (password.length < 8) {
        setAuthError("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setAuthError("Passwords do not match.");
        return;
      }
    }

    setSubmitting(true);
    const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/signin";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        mode === "signup" ? { name, email, password } : { email, password }
      ),
    });
    const data = (await res.json()) as { error?: string };
    setSubmitting(false);

    if (!res.ok) {
      setAuthError(data.error || "Something went wrong.");
      return;
    }

    playSuccess();
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/30";

  return (
    <div className={cn("relative flex min-h-dvh w-full flex-col bg-black", className)}>
      <div className="absolute inset-0 z-0">
        {initialCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [225, 224, 204],
                [255, 255, 255],
              ]}
              dotSize={6}
              reverse={false}
            />
          </div>
        )}

        {reverseCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-black"
              colors={[
                [225, 224, 204],
                [255, 205, 117],
              ]}
              dotSize={6}
              reverse={true}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,transparent_100%)]" />
        <div className="absolute top-0 right-0 left-0 h-1/3 bg-linear-to-b from-black to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <MiniNavbar mode={mode} onModeChange={handleModeChange} />

        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <div className="mt-28 w-full max-w-sm pb-16">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="session-loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 pt-8"
                  >
                    <div className="h-20 w-20 animate-pulse rounded-full bg-white/10" />
                    <div className="h-7 w-48 animate-pulse rounded-full bg-white/10" />
                    <div className="h-4 w-36 animate-pulse rounded-full bg-white/5" />
                  </motion.div>
                ) : user && step === "form" ? (
                  <SignedInAccount
                    user={user}
                    onContinue={finishToApp}
                    onLogout={() => void logout()}
                  />
                ) : step === "form" ? (
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, x: mode === "signup" ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mode === "signup" ? -80 : 80 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-2">
                      <h1 className="text-[2.35rem] leading-[1.1] font-medium tracking-tight text-white">
                        {mode === "signup" ? "Create your " : "Welcome to "}
                        <span className="bg-linear-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                          Repliq
                        </span>
                        {mode === "signup" ? " account" : ""}
                      </h1>
                      <p className="text-lg font-light text-white/60">
                        {mode === "signup"
                          ? "Sign up with a password to start reconstructing."
                          : "Sign in with your password to open the studio."}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-[2px] transition-colors hover:bg-white/10 disabled:opacity-60"
                      >
                        <GoogleIcon />
                        <span>
                          {googleLoading
                            ? "Connecting to Google…"
                            : mode === "signup"
                              ? "Sign up with Google"
                              : "Sign in with Google"}
                        </span>
                      </button>

                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-sm text-white/40">or</span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>

                      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-3 text-left">
                        {mode === "signup" && (
                          <input
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClass}
                            required
                            autoComplete="name"
                          />
                        )}
                        <input
                          type="email"
                          placeholder="you@studio.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClass}
                          required
                          autoComplete="email"
                        />
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputClass} pr-12`}
                            required
                            minLength={mode === "signup" ? 8 : undefined}
                            autoComplete={mode === "signup" ? "new-password" : "current-password"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((open) => !open)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-white"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {mode === "signup" && (
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={inputClass}
                            required
                            minLength={8}
                            autoComplete="new-password"
                          />
                        )}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="mt-1 w-full rounded-full bg-white py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:opacity-60"
                        >
                          {submitting
                            ? mode === "signup"
                              ? "Creating account…"
                              : "Signing in…"
                            : mode === "signup"
                              ? "Create account"
                              : "Sign in"}
                        </button>
                      </form>
                    </div>

                    {authError && <p className="text-sm text-rose-300">{authError}</p>}

                    <p className="text-sm text-white/40">
                      {mode === "signup" ? "Already have an account?" : "New to Repliq?"}{" "}
                      <button
                        type="button"
                        onClick={() => handleModeChange(mode === "signup" ? "signin" : "signup")}
                        className="text-white/80 underline underline-offset-4 hover:text-white"
                      >
                        {mode === "signup" ? "Log in" : "Sign up"}
                      </button>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-step"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] leading-[1.1] font-medium tracking-tight text-white">You&apos;re in</h1>
                      <p className="text-lg font-light text-white/50">The reconstruction studio is ready</p>
                    </div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="py-10"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-white to-[#ffcd75]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      onClick={finishToApp}
                      className="w-full rounded-full bg-white py-3 font-medium text-black transition-colors hover:bg-zinc-200"
                    >
                      Continue to dashboard
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

