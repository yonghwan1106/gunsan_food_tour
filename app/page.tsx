"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
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
} from "lucide-react";

// Slide data
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
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-light"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 flex items-center justify-center p-8"
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full glass hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-accent w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full glass hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 text-white/50 font-mono z-50">
        {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-8 left-8 text-white/30 text-sm z-50">
        ← → 키로 이동
      </div>
    </main>
  );
}

// Slide Components
function TitleSlide() {
  return (
    <div className="text-center max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <span className="px-4 py-2 rounded-full glass text-accent text-sm font-medium">
          2025 군산 미식관광 사업 아이디어 공모전
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-6xl md:text-8xl font-black mb-6"
      >
        <span className="gradient-text">군산 타임슬립</span>
        <br />
        <span className="text-white">미식투어</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-2xl md:text-3xl text-white/70 mb-12"
      >
        1930년대로 떠나는 미식 시간여행
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-8 text-white/50"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <span>근대역사</span>
        </div>
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-accent" />
          <span>미식체험</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent" />
          <span>감성여행</span>
        </div>
      </motion.div>
    </div>
  );
}

function BackgroundSlide() {
  const stats = [
    { label: "근대 문화유산", value: "47개소", icon: Building2 },
    { label: "평균 체류시간", value: "3-4시간", icon: Clock, highlight: true },
    { label: "재방문율", value: "10%", icon: TrendingUp, highlight: true },
    { label: "연간 관광객", value: "850만명", icon: Users },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">01</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">추진배경</h2>
        <p className="text-white/60 mt-4 text-xl">군산의 현황과 과제</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`p-6 rounded-2xl glass text-center ${
              stat.highlight ? "border-red-500/50" : ""
            }`}
          >
            <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.highlight ? "text-red-400" : "text-accent"}`} />
            <div className={`text-3xl font-bold mb-2 ${stat.highlight ? "text-red-400" : "text-white"}`}>
              {stat.value}
            </div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl glass"
      >
        <h3 className="text-xl font-bold text-accent mb-4">현재 문제점</h3>
        <ul className="grid md:grid-cols-3 gap-4 text-white/80">
          <li className="flex items-start gap-3">
            <span className="text-red-400">•</span>
            <span>&apos;보는&apos; 관광 위주의 단편적 체험</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400">•</span>
            <span>역사와 음식의 연결 스토리텔링 부재</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-400">•</span>
            <span>숙박 연계 프로그램 미흡</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

function FoodResourceSlide() {
  const resources = [
    {
      name: "이성당",
      since: "1920년~",
      desc: "한국에서 가장 오래된 빵집",
      icon: Coffee,
    },
    {
      name: "군산 3대 짬뽕",
      since: "1970년대~",
      desc: "빈해원, 복성루, 중화루",
      icon: Utensils,
    },
    {
      name: "서해 수산물",
      since: "전통",
      desc: "꽃게, 주꾸미, 박대",
      icon: Fish,
    },
    {
      name: "다문화 음식",
      since: "근대",
      desc: "일본식, 중화요리, 퓨전",
      icon: Globe,
    },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">02</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">군산의 미식 자원</h2>
        <p className="text-white/60 mt-4 text-xl">100년 역사가 담긴 맛의 보물창고</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            className="p-6 rounded-2xl glass flex items-start gap-6 hover:bg-white/10 transition-colors"
          >
            <div className="p-4 rounded-xl bg-accent/20">
              <resource.icon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-2xl font-bold">{resource.name}</h3>
                <span className="text-accent text-sm">{resource.since}</span>
              </div>
              <p className="text-white/60">{resource.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-xl text-white/70">
          <span className="text-accent font-bold">30+</span> 협력 가능 음식점 ·{" "}
          <span className="text-accent font-bold">100년</span> 역사의 맛 ·{" "}
          <span className="text-accent font-bold">5감</span> 체험 가능
        </p>
      </motion.div>
    </div>
  );
}

function ProblemSolutionSlide() {
  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">03</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">문제점 & 솔루션</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-2xl bg-red-900/20 border border-red-500/30"
        >
          <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
            <Target className="w-7 h-7" />
            현재 문제점
          </h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✕</span>
              <span>단편적인 &apos;보는&apos; 관광 중심</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✕</span>
              <span>역사-음식 연계 스토리텔링 부재</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✕</span>
              <span>짧은 체류시간 (3-4시간)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">✕</span>
              <span>낮은 재방문율 (10%)</span>
            </li>
          </ul>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-2xl bg-accent/10 border border-accent/30"
        >
          <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
            <Sparkles className="w-7 h-7" />
            솔루션
          </h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>타임슬립 컨셉</strong>으로 몰입감 있는 체험</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>역사×미식</strong> 결합 스토리텔링</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>5감 체험</strong> 프로그램 구성</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">✓</span>
              <span><strong>코스별 맞춤</strong> 다양한 옵션</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function ConceptSlide() {
  const senses = [
    { name: "시각", desc: "근대건축물, 복고 의상", icon: "👁️" },
    { name: "청각", desc: "1930년대 음악, 소리풍경", icon: "👂" },
    { name: "후각", desc: "전통 빵집, 로스팅 향", icon: "👃" },
    { name: "미각", desc: "근대 레시피 복원 요리", icon: "👅" },
    { name: "촉각", desc: "전통 도구, 요리 체험", icon: "✋" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">04</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">핵심 컨셉</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12 p-8 rounded-3xl glass"
      >
        <p className="text-3xl md:text-4xl font-bold">
          <span className="gradient-text">&quot;1930년대 근대 군산으로</span>
          <br />
          <span className="text-white">떠나는 미식 시간여행&quot;</span>
        </p>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xl text-white/60 mb-8"
      >
        5감 체험 프로그램
      </motion.h3>

      <div className="grid grid-cols-5 gap-4">
        {senses.map((sense, index) => (
          <motion.div
            key={sense.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="p-4 rounded-2xl glass text-center hover:bg-white/10 transition-colors"
          >
            <div className="text-4xl mb-3">{sense.icon}</div>
            <h4 className="text-lg font-bold text-accent mb-2">{sense.name}</h4>
            <p className="text-sm text-white/60">{sense.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProgramOverviewSlide() {
  const courses = [
    {
      name: "코스 A",
      title: "개항장의 아침",
      duration: "4시간",
      price: "50,000원",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "코스 B",
      title: "항구의 오후",
      duration: "3시간",
      price: "40,000원",
      color: "from-orange-500 to-orange-700",
    },
    {
      name: "코스 C",
      title: "선유도 해양 미식",
      duration: "8시간",
      price: "120,000원",
      color: "from-cyan-500 to-cyan-700",
    },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">05</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">프로그램 개요</h2>
        <p className="text-white/60 mt-4 text-xl">3개 코스 + 계절별 특별 프로그램</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="p-6 rounded-2xl glass overflow-hidden relative group hover:scale-105 transition-transform cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="relative z-10">
              <span className="text-sm text-white/60">{course.name}</span>
              <h3 className="text-2xl font-bold mt-1 mb-4">{course.title}</h3>
              <div className="flex items-center gap-4 text-white/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
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
        className="p-6 rounded-2xl glass"
      >
        <h3 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          계절별 특별 프로그램
        </h3>
        <div className="grid grid-cols-4 gap-4 text-center text-white/70">
          <div>🌸 봄 - 꽃게 축제</div>
          <div>☀️ 여름 - 주꾸미 체험</div>
          <div>🍂 가을 - 전어 페스티벌</div>
          <div>❄️ 겨울 - 굴 미식투어</div>
        </div>
      </motion.div>
    </div>
  );
}

function CourseASlide() {
  const timeline = [
    { time: "09:00", activity: "이성당 모닝빵 체험", icon: Coffee },
    { time: "10:00", activity: "근대역사박물관 투어", icon: Building2 },
    { time: "11:30", activity: "신흥동 일본식가옥 탐방", icon: Camera },
    { time: "12:30", activity: "빈해원 짬뽕 점심", icon: Utensils },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-accent text-lg font-medium">06</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">코스 A: 개항장의 아침</h2>
        <div className="flex items-center justify-center gap-6 mt-4 text-white/60">
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            4시간
          </span>
          <span className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            50,000원
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            최대 15명
          </span>
        </div>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-700" />

        {timeline.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className={`relative flex items-center gap-8 mb-6 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="p-4 rounded-xl glass inline-block">
                <span className="text-blue-400 font-mono text-lg">{item.time}</span>
                <p className="text-lg font-medium mt-1">{item.activity}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center z-10">
              <item.icon className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <span className="text-white/50">포함: 입장료, 모닝빵 세트, 점심 짬뽕, 해설 서비스</span>
      </motion.div>
    </div>
  );
}

function CourseBSlide() {
  const timeline = [
    { time: "14:00", activity: "월명공원 산책", icon: Sun },
    { time: "15:00", activity: "중화루 요리교실", icon: Utensils },
    { time: "17:00", activity: "군산항 선셋 투어", icon: Ship },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-accent text-lg font-medium">07</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">코스 B: 항구의 오후</h2>
        <div className="flex items-center justify-center gap-6 mt-4 text-white/60">
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-400" />
            3시간
          </span>
          <span className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            40,000원
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            최대 12명
          </span>
        </div>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-orange-700" />

        {timeline.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className={`relative flex items-center gap-8 mb-8 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="p-4 rounded-xl glass inline-block">
                <span className="text-orange-400 font-mono text-lg">{item.time}</span>
                <p className="text-lg font-medium mt-1">{item.activity}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center z-10">
              <item.icon className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center mt-8"
      >
        <span className="text-white/50">포함: 요리교실 재료비, 완성품 포장, 선셋 투어</span>
      </motion.div>
    </div>
  );
}

function CourseCSlide() {
  const timeline = [
    { time: "07:00", activity: "군산항 출발", icon: Ship },
    { time: "09:00", activity: "선유도 도착, 트레킹", icon: MapPin },
    { time: "12:00", activity: "해녀 체험 & 해산물 점심", icon: Waves },
    { time: "15:00", activity: "선유봉 일몰 감상", icon: Sun },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-accent text-lg font-medium">08</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">코스 C: 선유도 해양 미식</h2>
        <div className="flex items-center justify-center gap-6 mt-4 text-white/60">
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            8시간
          </span>
          <span className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            120,000원
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            최대 20명
          </span>
        </div>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-cyan-700" />

        {timeline.map((item, index) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className={`relative flex items-center gap-8 mb-6 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="p-4 rounded-xl glass inline-block">
                <span className="text-cyan-400 font-mono text-lg">{item.time}</span>
                <p className="text-lg font-medium mt-1">{item.activity}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center z-10">
              <item.icon className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <span className="text-white/50">포함: 왕복 선박, 해녀 체험, 해산물 점심, 트레킹 가이드</span>
      </motion.div>
    </div>
  );
}

function PartnershipSlide() {
  const partners = [
    { category: "음식점", count: 15, items: ["이성당", "빈해원", "복성루", "중화루"] },
    { category: "숙박", count: 5, items: ["옛터민박", "선유리조트", "군산호텔"] },
    { category: "체험", count: 6, items: ["해녀조합", "어촌계", "요리학원"] },
    { category: "운송", count: 4, items: ["선유도페리", "군산투어버스"] },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">09</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">협력 체계</h2>
        <p className="text-white/60 mt-4 text-xl">30개 협력업체와 함께하는 상생 프로젝트</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="p-6 rounded-2xl glass"
          >
            <div className="text-3xl font-bold text-accent mb-2">{partner.count}개</div>
            <h3 className="text-lg font-bold mb-4">{partner.category}</h3>
            <ul className="text-sm text-white/60 space-y-1">
              {partner.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl glass"
      >
        <h3 className="text-lg font-bold text-accent mb-4">상생 협력 방안</h3>
        <div className="grid md:grid-cols-3 gap-4 text-white/80">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-accent mt-0.5" />
            <span>매출 증대 수수료 모델</span>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-accent mt-0.5" />
            <span>공동 마케팅 지원</span>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-accent mt-0.5" />
            <span>교육 프로그램 제공</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MarketingSlide() {
  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">10</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">홍보 마케팅</h2>
        <p className="text-white/60 mt-4 text-xl">총 예산 6,400만원</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl glass"
        >
          <h3 className="text-xl font-bold text-accent mb-6">온라인 마케팅</h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex items-center justify-between">
              <span>SNS 인플루언서 협업</span>
              <span className="text-accent">2,000만원</span>
            </li>
            <li className="flex items-center justify-between">
              <span>네이버 블로그 체험단</span>
              <span className="text-accent">800만원</span>
            </li>
            <li className="flex items-center justify-between">
              <span>유튜브 콘텐츠 제작</span>
              <span className="text-accent">1,200만원</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl glass"
        >
          <h3 className="text-xl font-bold text-accent mb-6">오프라인 마케팅</h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex items-center justify-between">
              <span>지역 축제 연계</span>
              <span className="text-accent">1,000만원</span>
            </li>
            <li className="flex items-center justify-between">
              <span>여행사 팸투어</span>
              <span className="text-accent">800만원</span>
            </li>
            <li className="flex items-center justify-between">
              <span>홍보물 제작</span>
              <span className="text-accent">600만원</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function RoadmapSlide() {
  const phases = [
    {
      phase: "단기 (1년)",
      title: "시범운영",
      items: ["3개 코스 정규화", "협력업체 네트워크 구축", "시범 운영 및 피드백"],
      color: "from-green-500 to-green-700",
    },
    {
      phase: "중기 (2-3년)",
      title: "사업다각화",
      items: ["계절별 특별 프로그램", "기업 단체 상품 개발", "프랜차이즈 모델 구축"],
      color: "from-blue-500 to-blue-700",
    },
    {
      phase: "장기 (4-5년)",
      title: "글로벌 확장",
      items: ["외국인 관광객 유치", "해외 마케팅", "K-Food 투어 브랜드화"],
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">11</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">추진 로드맵</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            className="p-6 rounded-2xl glass overflow-hidden relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-20`} />
            <div className="relative z-10">
              <span className="text-sm text-white/60">{phase.phase}</span>
              <h3 className="text-2xl font-bold mt-1 mb-6">{phase.title}</h3>
              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EconomicEffectSlide() {
  const effects = [
    { label: "직접 매출", value: "2.9억원", sub: "연간 예상" },
    { label: "간접 효과", value: "22억원", sub: "지역경제 파급" },
    { label: "일자리 창출", value: "35개", sub: "직·간접 고용" },
    { label: "협력업체 매출", value: "+30%", sub: "증가 예상" },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">12</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">기대효과 - 경제적</h2>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {effects.map((effect, index) => (
          <motion.div
            key={effect.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="p-6 rounded-2xl glass text-center"
          >
            <div className="text-4xl font-black gradient-text mb-2">{effect.value}</div>
            <div className="text-lg font-bold text-white mb-1">{effect.label}</div>
            <div className="text-sm text-white/50">{effect.sub}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl glass"
      >
        <h3 className="text-lg font-bold text-accent mb-4">수익 구조</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white">투어 수익</div>
            <div className="text-white/60">참가비 수입</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">중개 수수료</div>
            <div className="text-white/60">협력업체 연계</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">부가 서비스</div>
            <div className="text-white/60">굿즈, 패키지</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SocialEffectSlide() {
  const effects = [
    {
      icon: Award,
      title: "브랜드 가치 제고",
      desc: "군산을 '미식 도시'로 포지셔닝",
    },
    {
      icon: Building2,
      title: "문화유산 보존",
      desc: "근대 문화유산의 지속 가능한 활용",
    },
    {
      icon: TrendingUp,
      title: "관광 패러다임 전환",
      desc: "'보는 관광'에서 '체험 관광'으로",
    },
    {
      icon: Heart,
      title: "지역 자긍심 향상",
      desc: "주민 참여형 관광 모델",
    },
  ];

  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-accent text-lg font-medium">13</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">기대효과 - 사회문화적</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {effects.map((effect, index) => (
          <motion.div
            key={effect.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="p-6 rounded-2xl glass flex items-start gap-6"
          >
            <div className="p-4 rounded-xl bg-accent/20">
              <effect.icon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{effect.title}</h3>
              <p className="text-white/60">{effect.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-xl text-white/70">
          체류시간 <span className="text-accent font-bold">3-4시간 → 1박 2일</span> 확대 목표
        </p>
      </motion.div>
    </div>
  );
}

function VisionSlide() {
  return (
    <div className="w-full max-w-5xl text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-accent text-lg font-medium">14</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">비전</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="p-12 rounded-3xl glass mb-12"
      >
        <p className="text-3xl md:text-5xl font-bold leading-tight">
          <span className="text-white/60">&quot;시간이 멈춘 도시에서</span>
          <br />
          <span className="gradient-text">시간을 여행하는 도시로&quot;</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        <div className="p-4 rounded-xl glass">
          <Globe className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-lg font-bold">K-Food 투어의 중심</div>
        </div>
        <div className="p-4 rounded-xl glass">
          <Star className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-lg font-bold">미식 관광 1번지</div>
        </div>
        <div className="p-4 rounded-xl glass">
          <Heart className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-lg font-bold">지속 가능한 관광</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <p className="text-2xl font-bold gradient-text">감사합니다</p>
        <p className="text-white/50">군산 타임슬립 미식투어</p>
      </motion.div>
    </div>
  );
}
