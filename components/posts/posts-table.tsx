'use client'

import * as React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, Instagram, Music } from 'lucide-react'
import { usePosts } from '@/lib/hooks/use-posts'
import { useUIStore } from '@/lib/stores/ui-store'
import { Button } from '@/components/ui/button'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']

export function PostsTable() {
  const { data: posts, isLoading, error } = usePosts()
  const { platformFilter, setPlatformFilter, setSelectedPost } = useUIStore()
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'posted_at', desc: true }
  ])

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: 'thumbnail_url',
      header: 'Thumbnail',
      cell: ({ row }) => (
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
          {row.original.thumbnail_url ? (
            <img
              src={row.original.thumbnail_url}
              alt={row.original.caption || 'Post'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'caption',
      header: 'Caption',
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">
          {row.original.caption || 'No caption'}
        </div>
      ),
    },
    {
      accessorKey: 'platform',
      header: 'Platform',
      cell: ({ row }) => {
        const isInstagram = row.original.platform === 'instagram'
        return (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            isInstagram
              ? 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300'
              : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
          }`}>
            {isInstagram ? <Instagram className="w-3 h-3" /> : <Music className="w-3 h-3" />}
            {isInstagram ? 'Instagram' : 'TikTok'}
          </div>
        )
      },
    },
    {
      accessorKey: 'likes',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent"
        >
          Likes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.likes.toLocaleString(),
    },
    {
      accessorKey: 'comments',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent"
        >
          Comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.comments.toLocaleString(),
    },
    {
      accessorKey: 'shares',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent"
        >
          Shares
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.shares.toLocaleString(),
    },
    {
      accessorKey: 'engagement_rate',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent"
        >
          Engagement Rate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const rate = row.original.engagement_rate
        if (rate === null) return <span className="text-muted-foreground">N/A</span>
        const color =
          rate >= 5 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
          rate >= 2 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' :
                      'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {rate.toFixed(2)}%
          </span>
        )
      },
    },
    {
      accessorKey: 'posted_at',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent"
        >
          Posted Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.original.posted_at).toLocaleDateString(),
    },
  ]

  const filteredData = React.useMemo(() => {
    if (!posts) return []
    if (platformFilter === 'all') return posts
    return posts.filter(post => post.platform === platformFilter)
  }, [posts, platformFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  if (isLoading) {
    return <div className="p-8 text-center">Loading posts...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading posts</div>
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No posts found. Start by adding some posts!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Platform Filter */}
      <div className="flex gap-2">
        <Button
          variant={platformFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setPlatformFilter('all')}
          size="sm"
        >
          All
        </Button>
        <Button
          variant={platformFilter === 'instagram' ? 'default' : 'outline'}
          onClick={() => setPlatformFilter('instagram')}
          size="sm"
        >
          <Instagram className="w-4 h-4 mr-2" />
          Instagram
        </Button>
        <Button
          variant={platformFilter === 'tiktok' ? 'default' : 'outline'}
          onClick={() => setPlatformFilter('tiktok')}
          size="sm"
        >
          <Music className="w-4 h-4 mr-2" />
          TikTok
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/60 overflow-x-auto shadow-sm bg-card">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b bg-muted/40">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-b last:border-0 cursor-pointer transition-colors hover:bg-accent/40 group ${idx % 2 === 0 ? '' : 'bg-muted/20'}`}
                onClick={() => setSelectedPost(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

