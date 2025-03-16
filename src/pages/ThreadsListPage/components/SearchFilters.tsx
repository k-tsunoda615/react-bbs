import { FC } from "react";
import { ArrowUpDown } from "lucide-react";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
  onTagSelect: (tag: string) => void;
  selectedCategory: string;
  selectedSort: string;
  searchQuery: string;
  selectedTags: string[];
}

export const SearchFilters: FC<SearchFiltersProps> = ({
  onSearch,
  onCategoryChange,
  onSortChange,
  onTagSelect,
  selectedCategory,
  selectedSort,
  searchQuery,
  selectedTags,
}) => {
  // 利用可能なタグのリスト
  const availableTags = ["プログラミング", "React", "TypeScript"];

  return (
    <div className="space-y-4 mb-8">
      <div className="flex gap-4 sm:flex-row flex-col">
        <Input
          placeholder="スレッドを検索..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="カテゴリー" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="programming">プログラミング</SelectItem>
              <SelectItem value="design">デザイン</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-3 w-3" />
                <SelectValue placeholder="並び替え" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">新着順</SelectItem>
              <SelectItem value="oldest">古い順</SelectItem>
              <SelectItem value="likes">いいね数順</SelectItem>
              <SelectItem value="comments">コメント数順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "secondary"}
            className="cursor-pointer hover:bg-secondary/80"
            onClick={() => onTagSelect(tag)}
          >
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
