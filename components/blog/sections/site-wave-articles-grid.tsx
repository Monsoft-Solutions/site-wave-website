"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Heart,
  MessageCircle,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SiteWaveArticle {
  id: string;
  title: string;
  excerpt: string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTime: number;
  featuredImage?: string;
  slug: string;
  trending?: boolean;
  likes?: number;
  comments?: number;
}

interface SiteWaveArticlesGridProps {
  articles: SiteWaveArticle[];
  title?: string;
  description?: string;
  showHeader?: boolean;
  className?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -12,
    scale: 1.03,
    transition: {
      duration: 0.3,
    },
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const getSiteWaveCategoryColor = (categoryName: string) => {
  const colors: Record<string, string> = {
    "Website Development": "from-ocean-blue to-ocean-blue/70",
    "SEO & Local Marketing": "from-coral-orange to-coral-orange/70",
    "Digital Marketing": "from-ocean-blue/80 to-coral-orange/80",
    "Business Automation": "from-deep-navy to-ocean-blue",
    "Case Studies": "from-coral-orange/80 to-deep-navy/80",
    "Industry Insights": "from-ocean-blue to-deep-navy",
    "How-To Guides": "from-coral-orange to-ocean-blue/70",
    "Local Business Tips": "from-deep-navy/80 to-coral-orange/80",
  };
  return colors[categoryName] || "from-ocean-blue to-coral-orange";
};

export function SiteWaveArticlesGrid({
  articles,
  title = "Latest Insights for SWFL Businesses",
  description = "Practical advice to grow your business in Southwest Florida",
  showHeader = true,
  className = "",
}: SiteWaveArticlesGridProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className={`py-20 ${className}`} ref={ref}>
      <div className="container">
        <motion.div
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          {showHeader && (
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-4 px-6 py-3 border-ocean-blue/30 bg-background/90 backdrop-blur-sm"
              >
                <BookOpen className="w-4 h-4 mr-2 text-ocean-blue" />
                Local Business Insights
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 font-heading">
                <span className="bg-gradient-to-r from-ocean-blue via-coral-orange to-ocean-blue bg-clip-text text-transparent">
                  {title.split(" ")[0]}
                </span>{" "}
                {title.split(" ").slice(1).join(" ")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            </motion.div>
          )}

          {/* No Articles State */}
          {articles.length === 0 && (
            <motion.div className="text-center py-20" variants={itemVariants}>
              <div className="max-w-lg mx-auto">
                <MapPin className="w-16 h-16 text-ocean-blue/40 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 font-heading text-muted-foreground">
                  No Articles Found
                </h3>
                <p className="text-muted-foreground mb-8">
                  We couldn&apos;t find any articles matching your search. Try
                  adjusting your filters or explore our categories.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white"
                >
                  <Link href="/blog">
                    Browse All Articles
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Articles Grid */}
          {articles.length > 0 && (
            <AnimatePresence>
              <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
              >
                {articles.map((article) => (
                  <motion.div
                    key={article.id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="group cursor-pointer"
                    layout
                  >
                    <motion.div variants={cardHoverVariants}>
                      <Card className="relative overflow-hidden border border-ocean-blue/10 bg-gradient-to-br from-card to-card/50 hover:border-ocean-blue/30 hover:shadow-2xl transition-all duration-500 h-full">
                        {/* Trending Badge */}
                        {article.trending && (
                          <div className="absolute top-4 left-4 z-20">
                            <Badge className="bg-coral-orange text-white border-0">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending in SWFL
                            </Badge>
                          </div>
                        )}

                        {/* Featured Image */}
                        <div className="relative overflow-hidden">
                          <div className="aspect-[16/10] relative">
                            <Image
                              src={
                                article.featuredImage ||
                                "/images/blog/placeholder.jpg"
                              }
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-ocean-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Category Badge */}
                          <div className="absolute bottom-4 right-4">
                            <Badge
                              className={`bg-gradient-to-r ${getSiteWaveCategoryColor(
                                article.category.name
                              )} text-white border-0 shadow-lg`}
                              asChild
                            >
                              <Link
                                href={`/blog/category/${article.category.slug}`}
                                className="hover:scale-105 transition-transform"
                              >
                                {article.category.name}
                              </Link>
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-6 flex-1 flex flex-col">
                          {/* Article Title */}
                          <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-ocean-blue transition-colors duration-200 font-heading">
                            <Link href={`/blog/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>

                          {/* Excerpt */}
                          <p className="text-muted-foreground mb-4 leading-relaxed flex-1 line-clamp-3">
                            {article.excerpt}
                          </p>

                          {/* Author & Meta */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              {article.author.avatar ? (
                                <Image
                                  src={article.author.avatar}
                                  alt={article.author.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-6 h-6 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                                  <User className="w-3 h-3 text-ocean-blue" />
                                </div>
                              )}
                              <span className="font-medium">
                                {article.author.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(article.publishedAt)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{article.readingTime} min</span>
                              </div>
                            </div>
                          </div>

                          {/* Engagement & CTA */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {article.likes && (
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{article.likes}</span>
                                </div>
                              )}
                              {article.comments && (
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{article.comments}</span>
                                </div>
                              )}
                            </div>

                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="text-ocean-blue hover:text-coral-orange hover:bg-ocean-blue/10 group/btn"
                            >
                              <Link href={`/blog/${article.slug}`}>
                                Read More
                                <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Bottom CTA for Local Businesses */}
          {articles.length > 0 && (
            <motion.div
              className="mt-20 text-center bg-gradient-to-br from-ocean-blue/5 via-soft-sand/30 to-coral-orange/5 rounded-3xl p-12"
              variants={itemVariants}
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <MapPin className="w-6 h-6 text-ocean-blue" />
                  <h3 className="text-2xl font-bold text-ocean-blue font-heading">
                    Ready to Transform Your Southwest Florida Business?
                  </h3>
                </div>

                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Don&apos;t just read about success—create it. Get personalized
                  strategies that work for businesses in Cape Coral, Fort Myers,
                  Naples, and across SWFL.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-ocean-blue hover:bg-ocean-blue/90 text-white font-medium"
                  >
                    <Link href="/contact">
                      Get Your Free Strategy Session
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white font-medium"
                  >
                    <Link href="/services">
                      Explore Our Services
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
