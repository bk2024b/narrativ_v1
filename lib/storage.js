-- Autoriser tout le monde à lire
CREATE POLICY "Avatars accessibles publiquement" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

-- Autoriser les utilisateurs authentifiés à uploader
CREATE POLICY "Les utilisateurs peuvent uploader des avatars" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Autoriser les utilisateurs à supprimer leurs propres fichiers
CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres avatars" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);