"use client";
import { Box, Pagination, Select, MenuItem, Typography } from "@mui/material";

export type PaginationProps = {
  total: number;
  pageSize: number;
  currentPage: number; // 1-based
  pageSizes?: number[];
  hidden?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
};

export default function PaginationContainer({
  total,
  pageSize,
  currentPage,
  pageSizes = [10, 20, 50, 100],
  hidden,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  if (hidden) return null;

  const pageCount = Math.max(
    1,
    Math.ceil((total ?? 0) / Math.max(1, pageSize))
  );

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: "32px 16px",
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
      }}
      className="pagination-container"
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        <Typography variant="body2">Rows per page</Typography>
        <Select
          size="small"
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
        >
          {pageSizes.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2">
          {Math.min((currentPage - 1) * pageSize + 1, total)}–
          {Math.min(currentPage * pageSize, total)} of {total}
        </Typography>
      </Box>

      <Pagination
        page={currentPage}
        count={pageCount}
        color="primary"
        onChange={(_, p) => onPageChange?.(p)}
      />
    </Box>
  );
}
