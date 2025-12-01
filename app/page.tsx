"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  MapPin,
  Users,
  TrendingUp,
  Star,
  Utensils,
  Ship,
  Building2,
  Camera,
  Heart,
  Target,
  Sparkles,
  Calendar,
  DollarSign,
  Globe,
  Award,
  Waves,
  Sun,
  Coffee,
  Fish,
  Eye,
  Ear,
  Hand,
  Megaphone,
  Laptop,
  Store,
  Truck,
  Bed,
  ArrowRight,
  Zap,
  CircleDollarSign,
  Briefcase,
  TrendingDown,
} from "lucide-react";

const slides = [
  { id: 1, title: "타이틀" },
  { id: 2, title: "추진배경" },
  { id: 3, title: "미식자원" },
  { id: 4, title: "문제점/솔루션" },
  { id: 5, title: "핵심컨셉" },
  { id: 6, title: "프로그램개요" },
  { id: 7, title: "코스A" },
  { id: 8, title: "코스B" },
  { id: 9, title: "코스C" },
  { id: 10, title: "협력체계" },
  { id: 11, title: "마케팅" },
  { id: 12, title: "로드맵" },
  { id: 13, title: "경제효과" },
  { id: 14, title: "사회효과" },
  { id: 15, title: "비전" },
];

// Circular Progress Component
function CircularProgress({ value, max, color, size = 120 }: { value: number; max: number; color: string; size?: number }) {
  const percentage = (value / max) * 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
    </div>
  );
}

// Decorative Background Shapes
function DecorativeShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-accent/40 rounded-full" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent/30 rounded-full" />
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full" />
    </div>
  );
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#111827] to-[#0a0f1a]" />
      <DecorativeShapes />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-accent via-accent-light to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute inset-0 flex items-center justify-center p-12"
        >
          {currentSlide === 0 && <TitleSlide />}
          {currentSlide === 1 && <BackgroundSlide />}
          {currentSlide === 2 && <FoodResourceSlide />}
          {currentSlide === 3 && <ProblemSolutionSlide />}
          {currentSlide === 4 && <ConceptSlide />}
          {currentSlide === 5 && <ProgramOverviewSlide />}
          {currentSlide === 6 && <CourseASlide />}
          {currentSlide === 7 && <CourseBSlide />}
          {currentSlide === 8 && <CourseCSlide />}
          {currentSlide === 9 && <PartnershipSlide />}
          {currentSlide === 10 && <MarketingSlide />}
          {currentSlide === 11 && <RoadmapSlide />}
          {currentSlide === 12 && <EconomicEffectSlide />}
          {currentSlide === 13 && <SocialEffectSlide />}
          {currentSlide === 14 && <VisionSlide />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        {/* First page button */}
        <button
          onClick={() => goToSlide(0)}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="처음으로"
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>

        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="이전"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-2.5 bg-accent rounded-full"
                  : "w-2.5 h-2.5 bg-white/20 rounded-full hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="다음"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Last page button */}
        <button
          onClick={() => goToSlide(slides.length - 1)}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="마지막으로"
        >
          <ChevronsRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-10 right-10 text-white/40 font-mono text-lg z-50">
        {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      <div className="absolute bottom-10 left-10 text-white/20 text-sm z-50 flex items-center gap-2">
        <span className="px-2 py-1 rounded bg-white/5 text-xs">←</span>
        <span className="px-2 py-1 rounded bg-white/5 text-xs">→</span>
        <span>키로 이동</span>
      </div>
    </main>
  );
}

// ==================== SLIDE COMPONENTS ====================

function TitleSlide() {
  return (
    <div className="text-center max-w-6xl relative">
      {/* Decorative elements */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent text-base font-medium">
          <Sparkles className="w-5 h-5" />
          2025 군산 미식관광 사업 아이디어 공모전
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-7xl md:text-9xl font-black mb-10 leading-[1.2]"
      >
        <span className="gradient-text">군산 타임슬립</span>
        <br />
        <span className="text-white">미식투어</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-3xl md:text-4xl text-white/60 mb-20 font-light leading-relaxed"
      >
        1930년대로 떠나는 미식 시간여행
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-16"
      >
        {[
          { icon: Clock, label: "근대역사" },
          { icon: Utensils, label: "미식체험" },
          { icon: Heart, label: "감성여행" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <item.icon className="w-8 h-8 text-accent" />
            </div>
            <span className="text-white/50 text-lg">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function BackgroundSlide() {
  const stats = [
    { label: "근대 문화유산", value: "47", unit: "개소", icon: Building2, color: "text-accent" },
    { label: "평균 체류시간", value: "3-4", unit: "시간", icon: Clock, color: "text-red-400", highlight: true },
    { label: "재방문율", value: "10", unit: "%", icon: TrendingDown, color: "text-red-400", highlight: true },
    { label: "연간 관광객", value: "850", unit: "만명", icon: Users, color: "text-accent" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="inline-flex items-center gap-3 text-accent text-xl font-semibold mb-6">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">01</span>
          추진배경
        </div>
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">군산의 현황과 과제</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border ${
              stat.highlight ? "border-red-500/30" : "border-white/10"
            } text-center group hover:bg-white/10 transition-all`}
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl ${stat.highlight ? "bg-red-500/20" : "bg-accent/20"} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className={`text-4xl font-black mb-3 ${stat.color}`}>
              {stat.value}
              <span className="text-xl font-medium ml-1">{stat.unit}</span>
            </div>
            <div className="text-white/50 text-sm leading-relaxed">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-red-900/20 to-transparent border border-red-500/20"
      >
        <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-3">
          <Target className="w-6 h-6" />
          현재 문제점
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "'보는' 관광 위주의 단편적 체험",
            "역사와 음식의 연결 스토리텔링 부재",
            "숙박 연계 프로그램 미흡",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-red-400 text-base">✕</span>
              </div>
              <span className="text-white/80 text-base leading-loose">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FoodResourceSlide() {
  const resources = [
    { name: "이성당", since: "1920년~", desc: "한국에서 가장 오래된 빵집", icon: Coffee, emoji: "🥐" },
    { name: "군산 3대 짬뽕", since: "1970년대~", desc: "빈해원, 복성루, 중화루", icon: Utensils, emoji: "🍜" },
    { name: "서해 수산물", since: "전통", desc: "꽃게, 주꾸미, 박대", icon: Fish, emoji: "🦀" },
    { name: "다문화 음식", since: "근대", desc: "일본식, 중화요리, 퓨전", icon: Globe, emoji: "🍱" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-3 text-accent text-xl font-semibold mb-6">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">02</span>
          미식 자원
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">군산의 미식 자원</h2>
        <p className="text-white/50 text-xl leading-relaxed">100년 역사가 담긴 맛의 보물창고</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            className="group p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start gap-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl">
                  {resource.emoji}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center">
                  <resource.icon className="w-4 h-4 text-accent" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold leading-snug">{resource.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs">{resource.since}</span>
                </div>
                <p className="text-white/60 text-base leading-relaxed">{resource.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-16 p-6 rounded-3xl bg-accent/5 border border-accent/20"
      >
        {[
          { value: "30+", label: "협력 가능 음식점" },
          { value: "100년", label: "역사의 맛" },
          { value: "5감", label: "체험 가능" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-black text-accent mb-2">{item.value}</div>
            <div className="text-white/50 text-sm leading-relaxed">{item.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ProblemSolutionSlide() {
  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-3 text-accent text-xl font-semibold mb-6">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">03</span>
          문제점 & 솔루션
        </div>
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">해결책을 제시합니다</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative p-8 rounded-3xl bg-gradient-to-br from-red-900/30 to-red-900/10 border border-red-500/30"
        >
          <div className="absolute -top-5 left-8">
            <div className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-sm">
              PROBLEM
            </div>
          </div>
          <h3 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-4 mt-2">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            현재 문제점
          </h3>
          <div className="space-y-4">
            {[
              "단편적인 '보는' 관광 중심",
              "역사-음식 연계 스토리텔링 부재",
              "짧은 체류시간 (3-4시간)",
              "낮은 재방문율 (10%)",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-red-900/20">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-base">✕</span>
                </div>
                <span className="text-white/80 text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="relative p-8 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30"
        >
          <div className="absolute -top-5 left-8">
            <div className="px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold text-sm">
              SOLUTION
            </div>
          </div>
          <h3 className="text-2xl font-bold text-accent mb-8 flex items-center gap-4 mt-2">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            솔루션
          </h3>
          <div className="space-y-4">
            {[
              { text: "타임슬립 컨셉으로 몰입감 있는 체험", bold: "타임슬립 컨셉" },
              { text: "역사×미식 결합 스토리텔링", bold: "역사×미식" },
              { text: "5감 체험 프로그램 구성", bold: "5감 체험" },
              { text: "코스별 맞춤 다양한 옵션", bold: "코스별 맞춤" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-accent/10">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent text-base">✓</span>
                </div>
                <span className="text-white/80 text-base leading-relaxed">
                  <strong className="text-accent">{item.bold}</strong>
                  {item.text.replace(item.bold, "")}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Arrow between */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <ArrowRight className="w-7 h-7 text-accent" />
        </div>
      </div>
    </div>
  );
}

function ConceptSlide() {
  const senses = [
    { name: "시각", desc: "근대건축물\n복고 의상", icon: Eye, color: "from-blue-500 to-blue-700" },
    { name: "청각", desc: "1930년대 음악\n소리풍경", icon: Ear, color: "from-purple-500 to-purple-700" },
    { name: "후각", desc: "전통 빵집\n로스팅 향", icon: Coffee, color: "from-amber-500 to-amber-700" },
    { name: "미각", desc: "근대 레시피\n복원 요리", icon: Utensils, color: "from-red-500 to-red-700" },
    { name: "촉각", desc: "전통 도구\n요리 체험", icon: Hand, color: "from-green-500 to-green-700" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 text-accent text-xl font-semibold mb-6">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">04</span>
          핵심 컨셉
        </div>
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">타임슬립 미식여행</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12 p-10 rounded-3xl bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/20"
      >
        <p className="text-3xl md:text-4xl font-bold leading-relaxed">
          <span className="gradient-text">&quot;1930년대 근대 군산으로</span>
          <br />
          <span className="text-white">떠나는 미식 시간여행&quot;</span>
        </p>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xl text-white/60 mb-10"
      >
        5감 체험 프로그램
      </motion.h3>

      <div className="grid grid-cols-5 gap-6">
        {senses.map((sense, index) => (
          <motion.div
            key={sense.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="group relative p-5 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:border-white/30 transition-all overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${sense.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${sense.color} flex items-center justify-center`}>
              <sense.icon className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">{sense.name}</h4>
            <p className="text-white/50 text-sm whitespace-pre-line leading-relaxed">{sense.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProgramOverviewSlide() {
  const courses = [
    { name: "A", title: "개항장의 아침", duration: "4시간", price: "50,000원", color: "from-blue-500 to-blue-700", icon: Sun },
    { name: "B", title: "항구의 오후", duration: "3시간", price: "40,000원", color: "from-orange-500 to-orange-700", icon: Ship },
    { name: "C", title: "선유도 해양 미식", duration: "8시간", price: "120,000원", color: "from-cyan-500 to-cyan-700", icon: Waves },
  ];

  const seasons = [
    { season: "봄", emoji: "🌸", food: "꽃게 축제" },
    { season: "여름", emoji: "☀️", food: "주꾸미 체험" },
    { season: "가을", emoji: "🍂", food: "전어 페스티벌" },
    { season: "겨울", emoji: "❄️", food: "굴 미식투어" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 text-accent text-xl font-semibold mb-6">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">05</span>
          프로그램 개요
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">3개 코스 투어</h2>
        <p className="text-white/50 text-xl leading-relaxed">+ 계절별 특별 프로그램</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {courses.map((course, index) => (
          <motion.div
            key={course.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <span className={`text-5xl font-black bg-gradient-to-br ${course.color} bg-clip-text text-transparent`}>
                  {course.name}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <course.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-5 leading-snug">{course.title}</h3>
              <div className="flex items-center justify-between text-white/60 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {course.price}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
      >
        <h3 className="text-lg font-bold text-accent mb-6 flex items-center gap-3">
          <Calendar className="w-5 h-5" />
          계절별 특별 프로그램
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {seasons.map((s, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-3">{s.emoji}</div>
              <div className="text-base font-bold text-white mb-2 leading-snug">{s.season}</div>
              <div className="text-white/50 text-sm leading-relaxed">{s.food}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CourseASlide() {
  const timeline = [
    { time: "09:00", activity: "이성당 모닝빵 체험", icon: Coffee, desc: "100년 전통 빵집에서 팥빵과 야채빵 맛보기" },
    { time: "10:00", activity: "근대역사박물관 투어", icon: Building2, desc: "일제강점기 군산의 역사 탐방" },
    { time: "11:30", activity: "신흥동 일본식가옥 탐방", icon: Camera, desc: "히로쓰 가옥 등 근대건축물 투어" },
    { time: "12:30", activity: "빈해원 짬뽕 점심", icon: Utensils, desc: "군산 3대 짬뽕 맛집에서 식사" },
  ];

  return (
    <div className="w-full max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 text-blue-400 text-xl font-semibold mb-5">
          <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">06</span>
          코스 A
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">개항장의 아침</h2>
        <div className="flex items-center justify-center gap-8">
          {[
            { icon: Clock, text: "4시간", color: "text-blue-400" },
            { icon: DollarSign, text: "50,000원", color: "text-blue-400" },
            { icon: Users, text: "최대 15명", color: "text-blue-400" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-white/60 text-base">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.text}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full" />

        {timeline.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className={`relative flex items-center gap-8 mb-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="inline-block p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-colors">
                <span className="text-blue-400 font-mono text-lg font-bold">{item.time}</span>
                <p className="text-lg font-bold mt-2 mb-2 leading-snug">{item.activity}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center z-10 shadow-lg shadow-blue-500/30">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center"
      >
        <span className="text-white/70 text-sm leading-relaxed">
          <strong className="text-blue-400">포함 내역:</strong> 입장료, 모닝빵 세트, 점심 짬뽕, 전문 해설 서비스
        </span>
      </motion.div>
    </div>
  );
}

function CourseBSlide() {
  const timeline = [
    { time: "14:00", activity: "월명공원 산책", icon: Sun, desc: "군산 시내가 한눈에 보이는 전망대" },
    { time: "15:00", activity: "중화루 요리교실", icon: Utensils, desc: "짬뽕 만들기 체험 & 시식" },
    { time: "17:00", activity: "군산항 선셋 투어", icon: Ship, desc: "서해 일몰 감상 & 포토존" },
  ];

  return (
    <div className="w-full max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 text-orange-400 text-xl font-semibold mb-5">
          <span className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-sm">07</span>
          코스 B
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">항구의 오후</h2>
        <div className="flex items-center justify-center gap-8">
          {[
            { icon: Clock, text: "3시간", color: "text-orange-400" },
            { icon: DollarSign, text: "40,000원", color: "text-orange-400" },
            { icon: Users, text: "최대 12명", color: "text-orange-400" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-white/60 text-base">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.text}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-orange-700 rounded-full" />

        {timeline.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className={`relative flex items-center gap-8 mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="inline-block p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-colors">
                <span className="text-orange-400 font-mono text-lg font-bold">{item.time}</span>
                <p className="text-lg font-bold mt-2 mb-2 leading-snug">{item.activity}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center z-10 shadow-lg shadow-orange-500/30">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center"
      >
        <span className="text-white/70 text-sm leading-relaxed">
          <strong className="text-orange-400">포함 내역:</strong> 요리교실 재료비, 완성품 포장, 선셋 투어
        </span>
      </motion.div>
    </div>
  );
}

function CourseCSlide() {
  const timeline = [
    { time: "07:00", activity: "군산항 출발", icon: Ship, desc: "쾌속선으로 선유도 이동" },
    { time: "09:00", activity: "선유도 트레킹", icon: MapPin, desc: "망주봉, 선유봉 해안 산책" },
    { time: "12:00", activity: "해녀 체험 & 점심", icon: Waves, desc: "직접 잡은 해산물로 점심 식사" },
    { time: "15:00", activity: "선유봉 일몰 감상", icon: Sun, desc: "서해 최고의 일몰 포인트" },
  ];

  return (
    <div className="w-full max-w-5xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 text-cyan-400 text-xl font-semibold mb-5">
          <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm">08</span>
          코스 C
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">선유도 해양 미식</h2>
        <div className="flex items-center justify-center gap-8">
          {[
            { icon: Clock, text: "8시간", color: "text-cyan-400" },
            { icon: DollarSign, text: "120,000원", color: "text-cyan-400" },
            { icon: Users, text: "최대 20명", color: "text-cyan-400" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-white/60 text-base">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.text}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-cyan-700 rounded-full" />

        {timeline.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className={`relative flex items-center gap-8 mb-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="inline-block p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-colors">
                <span className="text-cyan-400 font-mono text-lg font-bold">{item.time}</span>
                <p className="text-lg font-bold mt-2 mb-2 leading-snug">{item.activity}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center z-10 shadow-lg shadow-cyan-500/30">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center"
      >
        <span className="text-white/70 text-sm leading-relaxed">
          <strong className="text-cyan-400">포함 내역:</strong> 왕복 선박, 해녀 체험, 해산물 점심, 트레킹 가이드
        </span>
      </motion.div>
    </div>
  );
}

function PartnershipSlide() {
  const partners = [
    { category: "음식점", count: 15, icon: Store, color: "from-red-500 to-red-700", items: ["이성당", "빈해원", "복성루", "중화루"] },
    { category: "숙박", count: 5, icon: Bed, color: "from-blue-500 to-blue-700", items: ["옛터민박", "선유리조트", "군산호텔"] },
    { category: "체험", count: 6, icon: Camera, color: "from-green-500 to-green-700", items: ["해녀조합", "어촌계", "요리학원"] },
    { category: "운송", count: 4, icon: Truck, color: "from-purple-500 to-purple-700", items: ["선유도페리", "군산투어버스"] },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-3 text-accent text-xl font-semibold mb-6">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">09</span>
          협력 체계
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">상생 파트너십</h2>
        <p className="text-white/50 text-xl leading-relaxed">30개 협력업체와 함께하는 프로젝트</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-white/30 transition-all min-h-[280px]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10 h-full flex flex-col">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center mb-4`}>
                <partner.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-4xl font-black text-white mb-2">{partner.count}<span className="text-lg">개</span></div>
              <h3 className="text-lg font-bold mb-4 leading-snug">{partner.category}</h3>
              <div className="space-y-2 flex-grow">
                {partner.items.map((item) => (
                  <div key={item} className="text-white/50 text-xs leading-relaxed">• {item}</div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-3xl bg-accent/5 border border-accent/20"
      >
        <h3 className="text-lg font-bold text-accent mb-5">상생 협력 방안</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: CircleDollarSign, text: "매출 증대 수수료 모델" },
            { icon: Megaphone, text: "공동 마케팅 지원" },
            { icon: Award, text: "교육 프로그램 제공" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <span className="text-white/80 text-base leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function MarketingSlide() {
  const online = [
    { name: "SNS 인플루언서 협업", budget: "2,000만원", percent: 31 },
    { name: "네이버 블로그 체험단", budget: "800만원", percent: 13 },
    { name: "유튜브 콘텐츠 제작", budget: "1,200만원", percent: 19 },
  ];

  const offline = [
    { name: "지역 축제 연계", budget: "1,000만원", percent: 16 },
    { name: "여행사 팸투어", budget: "800만원", percent: 13 },
    { name: "홍보물 제작", budget: "600만원", percent: 8 },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-accent text-xl font-semibold mb-4">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">10</span>
          홍보 마케팅
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-4">마케팅 전략</h2>
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/30">
          <DollarSign className="w-6 h-6 text-accent" />
          <span className="text-2xl font-bold text-accent">총 예산 6,400만원</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Laptop className="w-6 h-6 text-blue-400" />
            </div>
            온라인 마케팅
          </h3>
          <div className="space-y-6">
            {online.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-lg">{item.name}</span>
                  <span className="text-accent font-bold text-lg">{item.budget}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-orange-400" />
            </div>
            오프라인 마케팅
          </h3>
          <div className="space-y-6">
            {offline.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-lg">{item.name}</span>
                  <span className="text-accent font-bold text-lg">{item.budget}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RoadmapSlide() {
  const phases = [
    {
      phase: "단기",
      year: "1년",
      title: "시범운영",
      items: ["3개 코스 정규화", "협력업체 네트워크", "피드백 수집"],
      color: "from-green-500 to-green-700",
      icon: Zap,
    },
    {
      phase: "중기",
      year: "2-3년",
      title: "사업다각화",
      items: ["계절별 프로그램", "기업 단체 상품", "프랜차이즈 구축"],
      color: "from-blue-500 to-blue-700",
      icon: TrendingUp,
    },
    {
      phase: "장기",
      year: "4-5년",
      title: "글로벌 확장",
      items: ["외국인 관광객 유치", "해외 마케팅", "K-Food 브랜드화"],
      color: "from-purple-500 to-purple-700",
      icon: Globe,
    },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-accent text-xl font-semibold mb-4">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">11</span>
          추진 로드맵
        </div>
        <h2 className="text-5xl md:text-6xl font-bold">성장 계획</h2>
      </motion.div>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 -translate-y-1/2 hidden md:block" />

        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="relative"
            >
              {/* Circle marker */}
              <div className={`hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${phase.color} items-center justify-center z-10`}>
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>

              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden relative group hover:border-white/30 transition-all mt-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                      <phase.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-white/50 text-sm">{phase.phase}</span>
                      <div className="text-2xl font-bold">{phase.year}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{phase.title}</h3>
                  <div className="space-y-4">
                    {phase.items.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-white/70">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EconomicEffectSlide() {
  const effects = [
    { label: "직접 매출", value: "2.9", unit: "억원", sub: "연간 예상", progress: 29, color: "#c4a052" },
    { label: "간접 효과", value: "22", unit: "억원", sub: "지역경제 파급", progress: 75, color: "#3b82f6" },
    { label: "일자리 창출", value: "35", unit: "개", sub: "직·간접 고용", progress: 50, color: "#22c55e" },
    { label: "협력업체 매출", value: "+30", unit: "%", sub: "증가 예상", progress: 30, color: "#a855f7" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-accent text-xl font-semibold mb-4">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">12</span>
          기대효과
        </div>
        <h2 className="text-5xl md:text-6xl font-bold">경제적 효과</h2>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8 mb-12">
        {effects.map((effect, index) => (
          <motion.div
            key={effect.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
          >
            <div className="flex justify-center mb-6">
              <CircularProgress value={effect.progress} max={100} color={effect.color} size={100} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-70%]">
                <div className="text-3xl font-black" style={{ color: effect.color }}>{effect.value}</div>
                <div className="text-sm text-white/50">{effect.unit}</div>
              </div>
            </div>
            <div className="text-xl font-bold text-white mb-2">{effect.label}</div>
            <div className="text-white/50">{effect.sub}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-8 rounded-3xl bg-accent/5 border border-accent/20"
      >
        <h3 className="text-xl font-bold text-accent mb-6">수익 구조</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: CircleDollarSign, title: "투어 수익", desc: "참가비 수입" },
            { icon: Store, title: "중개 수수료", desc: "협력업체 연계" },
            { icon: Briefcase, title: "부가 서비스", desc: "굿즈, 패키지" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-white/5">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{item.title}</div>
                <div className="text-white/50">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SocialEffectSlide() {
  const effects = [
    { icon: Award, title: "브랜드 가치 제고", desc: "군산을 '미식 도시'로 포지셔닝", color: "from-amber-500 to-amber-700" },
    { icon: Building2, title: "문화유산 보존", desc: "근대 문화유산의 지속 가능한 활용", color: "from-blue-500 to-blue-700" },
    { icon: TrendingUp, title: "관광 패러다임 전환", desc: "'보는 관광'에서 '체험 관광'으로", color: "from-green-500 to-green-700" },
    { icon: Heart, title: "지역 자긍심 향상", desc: "주민 참여형 관광 모델", color: "from-red-500 to-red-700" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-accent text-xl font-semibold mb-4">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">13</span>
          기대효과
        </div>
        <h2 className="text-5xl md:text-6xl font-bold">사회문화적 효과</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {effects.map((effect, index) => (
          <motion.div
            key={effect.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-white/30 transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${effect.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${effect.color} flex items-center justify-center flex-shrink-0`}>
                <effect.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{effect.title}</h3>
                <p className="text-white/60 text-base leading-relaxed">{effect.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/20 text-center"
      >
        <p className="text-xl text-white/70">
          체류시간{" "}
          <span className="inline-flex items-center gap-3 mx-2">
            <span className="text-red-400 font-bold text-2xl">3-4시간</span>
            <ArrowRight className="w-6 h-6 text-accent" />
            <span className="text-accent font-bold text-3xl">1박 2일</span>
          </span>{" "}
          확대 목표
        </p>
      </motion.div>
    </div>
  );
}

function VisionSlide() {
  return (
    <div className="w-full max-w-5xl text-center relative">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 text-accent text-xl font-semibold mb-4">
          <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm">14</span>
          비전
        </div>
        <h2 className="text-5xl md:text-6xl font-bold">미래를 향해</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative p-12 rounded-3xl bg-gradient-to-br from-accent/10 via-white/5 to-accent/10 border border-accent/30 mb-10 mt-8"
      >
        <p className="text-3xl md:text-5xl font-bold leading-relaxed">
          <span className="text-white/50">&quot;시간이 멈춘 도시에서</span>
          <br />
          <span className="gradient-text">시간을 여행하는 도시로&quot;</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6 mb-10"
      >
        {[
          { icon: Globe, title: "K-Food 투어의 중심", color: "from-blue-500 to-blue-700" },
          { icon: Star, title: "미식 관광 1번지", color: "from-amber-500 to-amber-700" },
          { icon: Heart, title: "지속 가능한 관광", color: "from-red-500 to-red-700" },
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all">
            <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
              <item.icon className="w-7 h-7 text-white" />
            </div>
            <div className="text-lg font-bold">{item.title}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <p className="text-4xl font-black gradient-text">감사합니다</p>
        <p className="text-white/40 text-lg">군산 타임슬립 미식투어</p>
      </motion.div>
    </div>
  );
}
