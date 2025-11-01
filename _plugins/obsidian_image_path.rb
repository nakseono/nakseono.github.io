# Obsidian 이미지 경로를 Jekyll 형식으로 변환하는 플러그인
Jekyll::Hooks.register :posts, :pre_render do |post|
  # 마크다운 이미지 링크에서 assets 폴더 경로가 없는 경우 추가
  # ![](filename.ext) -> ![](/assets/filename.ext)
  post.content = post.content.gsub(/!\[(.*?)\]\((?!\/|http)([^\/][^)]+)\)/) do |match|
    alt_text = $1
    filename = $2
    # assets 폴더 경로 추가
    "![#{alt_text}](/assets/#{filename})"
  end
end
