'use client'
// pages/feed.js
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function FeedPage() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          profiles (
            nom,
            prenom,
            profession,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })

      if (!error) setStories(data)
    }

    fetchStories()
  }, [])

  return (
    <div className='max-w-3xl mx-auto px-4 py-10 space-y-6'>
      <h1 className='text-2xl font-bold text-center mb-4'>Les histoires des utilisateurs</h1>

      {stories.map((story) => (
        <Card key={story.id}>
          <CardContent className='p-6'>
            <div className='flex gap-4 items-center mb-4'>
              <Avatar>
                <AvatarImage src={story.profiles.avatar_url} />
                <AvatarFallback>
                  {story.profiles.nom?.[0] ?? '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className='font-semibold'>
                  {story.profiles.nom} {story.profiles.prenom}
                </h2>
                <p className='text-sm text-muted-foreground'>
                  {story.profiles.profession}
                </p>
              </div>
            </div>

            <div className='whitespace-pre-wrap text-sm'>
              {story.improved_text}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
