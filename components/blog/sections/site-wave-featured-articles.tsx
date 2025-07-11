"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Star,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SiteWaveFeaturedArticle {
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
  featured?: boolean;
  trending?: boolean;
}

interface SiteWaveFeaturedArticlesProps {
  articles: SiteWaveFeaturedArticle[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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
      duration: 0.6,
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
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

export function SiteWaveFeaturedArticles({
  articles,
}: SiteWaveFeaturedArticlesProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const featuredArticle =
    articles.find((article) => article.featured) || articles[0];
  const otherArticles = articles
    .filter((article) => article.id !== featuredArticle?.id)
    .slice(0, 4);

  return (
    <section
      className="py-20 bg-gradient-to-br from-soft-sand/30 via-background to-ocean-blue/10"
      ref={ref}
    >
      <div className="container">
        <motion.div
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-4 px-6 py-3 border-coral-orange/30 bg-background/90 backdrop-blur-sm"
            >
              <Star className="w-4 h-4 mr-2 text-coral-orange" />
              Must-Read for SWFL Business Owners
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 font-heading">
              <span className="bg-gradient-to-r from-ocean-blue via-coral-orange to-ocean-blue bg-clip-text text-transparent">
                Featured
              </span>{" "}
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real insights from real businesses in Southwest Florida. Learn
              strategies that work for companies just like yours in Cape Coral,
              Fort Myers, and Naples.
            </p>
          </motion.div>

          {featuredArticle && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Featured Article */}
              <motion.div
                className="lg:col-span-2"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card/50 border border-ocean-blue/20 shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:bg-grid-slate-700/25 opacity-30" />

                  {/* Content */}
                  <div className="relative z-10 p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]">
                      {/* Text Content */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <Badge className="bg-ocean-blue text-white">
                            {featuredArticle.category.name}
                          </Badge>
                          {featuredArticle.trending && (
                            <Badge
                              variant="outline"
                              className="border-coral-orange text-coral-orange bg-coral-orange/10"
                            >
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending in SWFL
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight group-hover:text-ocean-blue transition-colors duration-300 font-heading">
                          <Link href={`/blog/${featuredArticle.slug}`}>
                            {featuredArticle.title}
                          </Link>
                        </h3>

                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>

                        {/* Author & Meta */}
                        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            {featuredArticle.author.avatar ? (
                              <Image
                                src={featuredArticle.author.avatar}
                                alt={featuredArticle.author.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-ocean-blue" />
                              </div>
                            )}
                            <span className="font-medium">
                              {featuredArticle.author.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(featuredArticle.publishedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{featuredArticle.readingTime} min read</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Button
                          asChild
                          className="bg-coral-orange hover:bg-coral-orange/90 text-white font-medium group"
                        >
                          <Link href={`/blog/${featuredArticle.slug}`}>
                            Read Success Story
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>

                      {/* Featured Image */}
                      <div className="relative">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-2xl">
                          <Image
                            src={
                              featuredArticle.featuredImage ||
                              "/images/blog/placeholder.jpg"
                            }
                            alt={featuredArticle.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-ocean-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Side Articles */}
              <motion.div className="space-y-6" variants={itemVariants}>
                {otherArticles.slice(0, 2).map((article) => (
                  <motion.div
                    key={article.id}
                    whileHover={cardHoverVariants.hover}
                    className="group cursor-pointer"
                  >
                    <Card className="border border-ocean-blue/10 hover:border-ocean-blue/30 transition-colors duration-300 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Badge
                              variant="outline"
                              className="mb-3 text-xs border-coral-orange/30 text-coral-orange"
                            >
                              {article.category.name}
                            </Badge>
                            <h4 className="font-semibold mb-2 leading-tight group-hover:text-ocean-blue transition-colors duration-200 font-heading">
                              <Link href={`/blog/${article.slug}`}>
                                {article.title}
                              </Link>
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{article.readingTime} min</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(article.publishedAt)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-20 h-20 relative overflow-hidden rounded-lg flex-shrink-0">
                            <Image
                              src={
                                article.featuredImage ||
                                "/images/blog/placeholder.jpg"
                              }
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            className="text-center bg-gradient-to-r from-ocean-blue/5 via-soft-sand/20 to-coral-orange/5 rounded-2xl p-8"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-ocean-blue" />
              <span className="text-lg font-semibold text-ocean-blue font-heading">
                Ready to grow your Southwest Florida business?
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized advice for your Cape Coral, Fort Myers, or Naples
              business. Our local experts understand the SWFL market.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-ocean-blue hover:bg-ocean-blue/90 text-white font-medium"
            >
              <Link href="/contact">
                Get Your Free Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
