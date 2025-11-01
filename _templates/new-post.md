<%*
// 제목 입력받기
let title = await tp.system.prompt("포스트 제목을 입력하세요");
if (!title) title = "Untitled";

// 현재 날짜
let date = tp.date.now("YYYY-MM-DD");

// 파일명 생성 (날짜-제목.md)
let fileName = date + "-" + title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-가-힣]/g, '');

// 파일 이름 변경
await tp.file.rename(fileName);
%>---
layout: post
title: "<% title %>"
date: <% date %>
categories:
---

