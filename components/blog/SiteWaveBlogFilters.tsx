"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, MapPin, Waves } from "lucide-react";
import { motion } from "framer-motion";

interface SiteWaveBlogFiltersProps {
  categories: Array<{ name: string; slug: string; count: number }>;
  currentCategory?: string;
  currentSearch?: string;
  currentPage?: number;
  totalPages?: number;
}

export function SiteWaveBlogFilters({
  categories,
  currentCategory = "all",
  currentSearch = "",
  currentPage = 1,
  totalPages = 1,
}: SiteWaveBlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch);

  // Update search value when currentSearch prop changes
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const createURL = (params: Record<string, string | undefined>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "") {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    // Always reset to page 1 when filtering changes
    if (params.category !== undefined || params.search !== undefined) {
      newSearchParams.delete("page");
    }

    return `${pathname}?${newSearchParams.toString()}`;
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);

    // Debounce search
    const timeoutId = setTimeout(() => {
      startTransition(() => {
        router.push(
          createURL({
            search: value,
            category: currentCategory === "all" ? undefined : currentCategory,
          })
        );
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleCategoryFilter = (categorySlug: string) => {
    startTransition(() => {
      router.push(
        createURL({
          category: categorySlug,
          search: currentSearch || undefined,
        })
      );
    });
  };

  const handleClearFilters = () => {
    setSearchValue("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      router.push(
        createURL({
          page: page.toString(),
          category: currentCategory === "all" ? undefined : currentCategory,
          search: currentSearch || undefined,
        })
      );
    });
  };

  const hasActiveFilters = currentCategory !== "all" || currentSearch !== "";

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Waves className="w-5 h-5 text-ocean-blue" />
          <h2 className="text-2xl font-bold text-ocean-blue font-heading">
            Find Insights for Your SWFL Business
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Search our library of articles designed specifically for Southwest
          Florida business owners. Filter by your business needs to find exactly
          what you&apos;re looking for.
        </p>
      </div>

      {/* Search and Clear Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md mx-auto md:mx-0">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ocean-blue/60" />
          <Input
            placeholder="Search articles (e.g., 'SEO for Cape Coral businesses')"
            className="pl-10 border-ocean-blue/30 focus:border-ocean-blue focus:ring-ocean-blue/20 bg-white/80 backdrop-blur-sm"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            disabled={isPending}
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            disabled={isPending}
            className="gap-2 border-coral-orange/30 text-coral-orange hover:bg-coral-orange hover:text-white self-center md:self-auto"
          >
            <X className="size-4" />
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-ocean-blue/10">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="size-5 text-ocean-blue" />
          <h3 className="text-lg font-semibold text-ocean-blue font-heading">
            Filter by Business Need
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* All Categories Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Badge
              variant={currentCategory === "all" ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 px-4 py-2 ${
                currentCategory === "all"
                  ? "bg-ocean-blue text-white hover:bg-ocean-blue/90"
                  : "bg-white border-ocean-blue/30 text-ocean-blue hover:bg-ocean-blue hover:text-white"
              }`}
              onClick={() => handleCategoryFilter("all")}
            >
              <MapPin className="w-3 h-3 mr-1" />
              All SWFL Articles (
              {categories.reduce((sum, cat) => sum + cat.count, 0)})
            </Badge>
          </motion.div>

          {/* Category Badges */}
          {categories.map((category) => (
            <motion.div
              key={category.slug}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={
                  category.slug === currentCategory ? "default" : "secondary"
                }
                className={`cursor-pointer transition-all duration-200 px-4 py-2 ${
                  category.slug === currentCategory
                    ? "bg-coral-orange text-white hover:bg-coral-orange/90"
                    : "bg-white border-coral-orange/30 text-coral-orange hover:bg-coral-orange hover:text-white"
                }`}
                onClick={() => handleCategoryFilter(category.slug)}
              >
                {category.name} ({category.count})
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          className="bg-soft-sand/50 rounded-xl p-4 border border-ocean-blue/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Filter className="size-4 text-ocean-blue" />
            <span className="text-sm font-medium text-ocean-blue">
              Active Filters:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentSearch && (
              <Badge
                variant="outline"
                className="border-ocean-blue/30 text-ocean-blue bg-white"
              >
                Search: &quot;{currentSearch}&quot;
              </Badge>
            )}
            {currentCategory !== "all" && (
              <Badge
                variant="outline"
                className="border-coral-orange/30 text-coral-orange bg-white"
              >
                Category:{" "}
                {categories.find((c) => c.slug === currentCategory)?.name}
              </Badge>
            )}
          </div>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center items-center gap-2 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            disabled={currentPage <= 1 || isPending}
            onClick={() => handlePageChange(currentPage - 1)}
            className="border-ocean-blue/30 text-ocean-blue hover:bg-ocean-blue hover:text-white"
          >
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <motion.div
                  key={pageNumber}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    size="sm"
                    disabled={isPending}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 ${
                      pageNumber === currentPage
                        ? "bg-coral-orange text-white hover:bg-coral-orange/90"
                        : "border-ocean-blue/30 text-ocean-blue hover:bg-ocean-blue hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <Button
            variant="outline"
            disabled={currentPage >= totalPages || isPending}
            onClick={() => handlePageChange(currentPage + 1)}
            className="border-ocean-blue/30 text-ocean-blue hover:bg-ocean-blue hover:text-white"
          >
            Next
          </Button>
        </motion.div>
      )}

      {/* Results Summary */}
      <div className="text-center text-sm text-muted-foreground">
        {isPending ? (
          <span>Searching...</span>
        ) : hasActiveFilters ? (
          <span>Showing results for your Southwest Florida business needs</span>
        ) : (
          <span>Browse all articles for SWFL business owners</span>
        )}
      </div>
    </motion.div>
  );
}
