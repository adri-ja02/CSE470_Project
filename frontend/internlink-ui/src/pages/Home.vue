<script setup>
import {
  BadgeCheck,
  Building2,
  GraduationCap,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap
} from 'lucide-vue-next'

const proofCards = [
  {
    icon: Users,
    value: '12k+',
    label: 'builders onboarded',
    className: 'proof-card proof-card-left'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'creator rating',
    className: 'proof-card proof-card-right'
  },
  {
    icon: BadgeCheck,
    value: '86%',
    label: 'ship before week two',
    className: 'proof-card proof-card-bottom'
  }
]

const surfaces = [
  {
    label: 'Desktop',
    className: 'surface-frame surface-desktop'
  },
  {
    label: 'Tablet',
    className: 'surface-frame surface-tablet'
  },
  {
    label: 'Mobile',
    className: 'surface-frame surface-mobile'
  }
]
</script>

<template>
  <main class="overflow-hidden bg-[#040506] text-white">
    <section class="hero-scene relative px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/hero-cave-moonlight.png')"
      ></div>
      <div class="absolute inset-0 bg-black/45"></div>
      <div class="absolute inset-x-0 bottom-0 h-32 bg-[#040506]/80"></div>

      <div class="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.78fr)] lg:items-center">
        <div class="max-w-3xl py-10 lg:py-16">
          <div class="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-emerald-100 shadow-2xl backdrop-blur-md">
            <Sparkles :size="16" />
            InternLink Studio
          </div>

          <h1 class="mt-7 text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Anyone Can Build
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-8 text-gray-200 sm:text-xl">
            Shape internship portals, hiring flows, and role-aware workspaces from one polished prompt.
          </p>

          <div class="mt-8 max-w-2xl rounded-lg border border-white/15 bg-[#07090b]/85 p-3 shadow-2xl backdrop-blur-md">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <div class="flex items-center gap-2 text-sm font-semibold text-gray-200">
                <Zap :size="16" class="text-amber-300" />
                Build prompt
              </div>
              <div class="flex items-center gap-1.5">
                <span class="h-2.5 w-2.5 rounded-full bg-rose-300"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
              </div>
            </div>

            <div class="grid gap-3 pt-3 sm:grid-cols-[1fr_auto]">
              <div class="min-h-28 rounded-md border border-white/10 bg-black/35 p-4 text-left text-base leading-7 text-gray-100">
                Create a premium internship portal with student, company, and admin dashboards, password reset, and a cinematic first impression.
              </div>

              <router-link
                to="/auth"
                class="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-bold text-[#04100c] transition hover:bg-emerald-300 sm:self-end"
              >
                <Send :size="17" />
                Start
              </router-link>
            </div>
          </div>
        </div>

        <div class="hero-orbit relative min-h-[420px] lg:min-h-[620px]">
          <div class="builder-console relative mx-auto max-w-md rounded-lg border border-white/15 bg-[#080a0c]/80 p-4 shadow-2xl backdrop-blur-md">
            <div class="mb-4 flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">Live build</p>
                <h2 class="mt-1 text-xl font-bold">Role workspace</h2>
              </div>
              <ShieldCheck class="text-emerald-300" :size="28" />
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <GraduationCap class="text-cyan-200" :size="22" />
                <div>
                  <p class="text-sm font-semibold">Student</p>
                  <p class="text-xs text-gray-400">Applications, saved roles, progress</p>
                </div>
              </div>

              <div class="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <Building2 class="text-amber-200" :size="22" />
                <div>
                  <p class="text-sm font-semibold">Company</p>
                  <p class="text-xs text-gray-400">Listings, candidates, shortlists</p>
                </div>
              </div>

              <div class="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <ShieldCheck class="text-emerald-200" :size="22" />
                <div>
                  <p class="text-sm font-semibold">Admin</p>
                  <p class="text-xs text-gray-400">Users, approvals, reports</p>
                </div>
              </div>
            </div>
          </div>

          <article
            v-for="card in proofCards"
            :key="card.label"
            :class="card.className"
          >
            <component :is="card.icon" :size="18" class="text-emerald-200" />
            <div>
              <p class="text-lg font-black text-white">{{ card.value }}</p>
              <p class="text-xs text-gray-300">{{ card.label }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="relative mx-auto -mt-4 grid max-w-7xl gap-4 px-4 pb-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <article
        v-for="surface in surfaces"
        :key="surface.label"
        class="rounded-lg border border-white/10 bg-[#090b0d] p-4 shadow-xl"
      >
        <div :class="surface.className">
          <div class="surface-bar"></div>
          <div class="surface-line wide"></div>
          <div class="surface-line"></div>
          <div class="surface-grid">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p class="mt-4 text-sm font-semibold text-gray-200">{{ surface.label }}</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.hero-scene {
  min-height: calc(100svh - 72px);
}

.proof-card {
  align-items: center;
  background: rgba(8, 10, 12, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  display: flex;
  gap: 12px;
  padding: 14px;
  position: absolute;
  width: 190px;
  backdrop-filter: blur(16px);
}

.proof-card-left {
  left: 0;
  top: 92px;
  transform: rotate(-3deg);
}

.proof-card-right {
  right: 0;
  top: 210px;
  transform: rotate(3deg);
}

.proof-card-bottom {
  bottom: 64px;
  left: 54px;
  transform: rotate(2deg);
}

.builder-console {
  margin-top: 72px;
}

.surface-frame {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: #050607;
  min-height: 140px;
  overflow: hidden;
  padding: 14px;
}

.surface-desktop {
  aspect-ratio: 16 / 9;
}

.surface-tablet {
  aspect-ratio: 4 / 3;
  max-width: 76%;
}

.surface-mobile {
  aspect-ratio: 9 / 16;
  max-width: 44%;
}

.surface-bar {
  background: #34d399;
  border-radius: 999px;
  height: 8px;
  width: 38%;
}

.surface-line {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  height: 8px;
  margin-top: 12px;
  width: 58%;
}

.surface-line.wide {
  width: 82%;
}

.surface-grid {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 18px;
}

.surface-grid span {
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  display: block;
  min-height: 44px;
}

@media (max-width: 1023px) {
  .hero-scene {
    min-height: auto;
  }

  .builder-console {
    margin-top: 0;
  }

  .proof-card {
    position: static;
    transform: none;
    width: auto;
  }

  .hero-orbit {
    display: grid;
    gap: 14px;
    min-height: auto;
  }
}
</style>
