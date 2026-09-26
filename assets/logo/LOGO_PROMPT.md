# Логотип KAST — промпт для модели изображений

> **Создан:** 2026-09-26 (агент, по слову владельца: логотип — два узла; слева ПК на Windows с Vibepollo и антенной,
> которая шлёт сигналы в небо; справа антенна и Android-устройство с KAST, которое принимает радиоволны с неба; KAST
> дружит с Vibepollo; Windows передаётся на Android-клиент по беспроводным сетям почти бесшовно) · **Родитель:** слово
> владельца в чате · **Статус:** версия 1 — картинка получена 2026-09-26, сцена принята с правками, иконка отклонена
> владельцем; итоговый промпт дал картинку 2026-09-26 (`KAST_LOGO_raw.png`): шапка README — `kast-logo.png`, иконка приложения (верхний ряд, вторая слева) — `kast-icon-1024.png`, `kast-icon-512.png` · **Вовне:** иконка — в лаунчер-иконки Android; логотип — в эту
> папку (`assets/logo/`); шапка README стоит с 2026-09-26

## Итоговый промпт (2026-09-26) — иконка и сцена одним запросом

Слово владельца: «собери один итоговый промпт» · «Иконка наша должна быть проста и понятна» · «К не нужно в
иконке». Из версии 3 оставлено одно направление иконки — A3, экран собирается из блоков потока. Направления с
буквой K (C2, B1) и перегруженное A1 сняты. Правка сцены — из версии 2. Промпт отправляется вместе с картинкой
версии 1.

```text
Two tasks for the KAST logo. KAST is an Android client that streams games from a Windows PC to a phone or
tablet and keeps the stream alive over weak mobile internet. The attached image is our first version.

TASK 1 — THE APP ICON. It must be simple and clear: one shape, one idea, readable at 48 x 48 px.
The idea: a screen assembled from the stream. One rounded rectangle screen; its left part is 3-4 big square
blocks with gaps that drift in from the left; toward the right the blocks close into one solid surface.
No letters, no text, no antennas, no Wi-Fi symbol, no play triangle, no small details.
Style: flat vector; three colors at most — deep navy background, bright cyan-teal for the stream, warm
amber as one small accent; thick shapes, no thin lines; no glassmorphism, no Liquid Glass, no gradients
except one soft glow; a solid navy background, no painted checkerboard.
Android adaptive icon: keep the key shape inside the central circle (the 66 dp safe zone of a 108 dp icon)
so it survives circle and squircle masks. Show 6 variants; for each show the full icon, the same icon in a
circle mask, and the icon at 48 x 48 px.

TASK 2 — THE HORIZONTAL LOGO. Keep the attached scene and its style (PC with antenna on the left, an arc of
flying game frames in the night sky, a tablet with antenna on the right), with these fixes:
1) replace the Windows logo on the PC screen with an abstract desktop — a few simple window rectangles;
2) remove the small "KAST" nameplate under the tablet — the big wordmark already names the app;
3) redraw the wordmark "KAST" with clean letterforms — the letter A has a white glitch at its base;
4) put the best icon from Task 1 to the left of the wordmark "KAST";
5) make the background truly transparent — no painted checkerboard, no watermark artifacts.
Keep the "Vibepollo" nameplate under the PC exactly as it is.
```

## Версия 3 (2026-09-26) — иконка по разбору GPT

Владелец принёс разбор GPT: иконка — «фрагмент ДНК» большой сцены; треугольник Play — общее место видеоплееров;
короткий список A1 · B1 · C2 · A3. Агент согласен с разбором; фаворит агента — A3 (одна фигура читается и при 48 px),
знак бренда — C2. Разбор GPT не учёл требование Android: лаунчер обрезает иконку маской (круг или скруглённый
квадрат), и ключевая фигура должна помещаться в центральный круг (безопасная зона 66 dp из 108 dp); с Android 13
нужен одноцветный силуэт для тематических иконок. Выбор направления — за владельцем.

Промпт 3 — иконка приложения (вставляется в ChatGPT целиком):

```text
Design an Android app icon for KAST — a client that streams games from a PC to a phone or tablet over weak
mobile internet. The icon has one idea: fragments of a game frame fly in and assemble into one picture.
No antennas, no Wi-Fi symbol, and no play triangle unless a direction asks for it.

Render these four directions, 3 variants each:
A3 "screen assembled from the stream": one rounded rectangle screen; its left part is made of separate
square blocks with gaps that drift in from the left; toward the right the blocks close into one solid surface.
A1 "frame flies into the screen": a rounded landscape screen; 3 large square fragments fly into it from the
left in a loose stream, the closest one already merging into the picture; the fragments shift from cyan to
teal to white as they approach.
C2 "fragments assemble into K": 3 square fragments fly in from the left and assemble into a bold geometric
letter K.
B1 "K with a hidden play": a bold geometric K whose two diagonals leave a play-triangle-shaped negative
space between them; 2 small squares trail behind.

Rules for all: flat vector; three colors at most — deep navy background, bright cyan-teal for the stream,
warm amber as one small accent; thick shapes, no thin lines, no text; no glassmorphism, no Liquid Glass,
one soft glow at most; a solid navy background, no painted checkerboard.
Android adaptive icon: keep the key shape inside the central circle (the 66 dp safe zone of a 108 dp icon)
so it survives circle and squircle masks. For each variant show the full icon, the same icon in a circle
mask, and the icon at 48 x 48 px. Also give a single-color silhouette of the best variant for Android 13
themed icons.
```

## Версия 2 (2026-09-26) — после первой картинки

Разбор первой картинки:
1. Сцена читается слева направо (ПК → дуга летящих кадров → планшет), палитра и плоский стиль совпали с заказом.
2. Шахматный «прозрачный» фон нарисован в самой картинке, по углам — разводы вроде водяных знаков.
3. На экране ПК стоит точный логотип Windows — товарный знак Microsoft.
4. Надпись «KAST» стоит дважды: большая надпись и табличка под планшетом (ошибка промпта версии 1).
5. В букве «A» большой надписи — белый обломок у основания.
6. Иконка из двух антенн с дугами при 48 px читается как значок Wi-Fi или магнит; стрим в ней не виден
   (слово владельца: «нужна сильная абстракция про стрим»).

Промпт 2A — иконка приложения (вставляется в ChatGPT целиком):

```text
Design a square app icon for KAST — an Android client that streams games and the desktop from a PC to a
phone or tablet and keeps the stream alive through weak mobile internet. The icon must say "stream" at a
glance, even at 48 x 48 px.

Direction A, "a screen assembled from a stream": one rounded landscape screen (a tablet) fills the right
two-thirds; inside it sits a bold play triangle. From the left, a short trail of 3-4 small squares (fragments
of a video frame) flies into the screen, each square larger and brighter than the one before — the picture
is being assembled from the stream.

Direction B, "K monogram": a bold geometric letter K whose right half is a play triangle; behind the K a
short motion trail of 3-4 small squares.

For both directions: flat vector, three colors at most — deep navy background, bright cyan-teal for the
stream, warm amber for one accent; thick shapes and no thin lines; no text; no Windows or Android logos;
no antennas and no Wi-Fi symbol; no glassmorphism and no Liquid Glass; no gradients except one soft glow.
A rounded-square icon on a solid navy background, no painted checkerboard. Show 4 variants per direction,
and next to each big version render the same icon at 48 x 48 px.
```

Промпт 2B — правка горизонтальной сцены (вставляется вместе с картинкой версии 1):

```text
Keep this horizontal scene and its style, with these fixes:
1) replace the Windows logo on the PC screen with an abstract desktop — a few simple window rectangles;
2) remove the small "KAST" nameplate under the tablet — the big wordmark already names the app;
3) redraw the wordmark "KAST" with clean letterforms — the letter A has a white glitch at its base;
4) make the background truly transparent — no painted checkerboard, no watermark artifacts;
5) place the chosen app icon to the left of the wordmark "KAST".
```

## Версия 1 (2026-09-26)

Промпт ниже вставлялся в ChatGPT целиком. Эмблема Windows и робот Android описаны узнаваемыми формами без точных
товарных знаков: логотип публичного проекта не должен копировать чужие знаки.

---

```text
Create a logo for KAST — an Android game-streaming client. The picture tells one story: a Windows PC streams
its screen through the sky to an Android device, almost seamlessly, and the two sides are friends.

Composition (horizontal, left to right):
- Left node, the host: a Windows desktop PC (a monitor and a small tower) with a four-pane window emblem on
  the screen — the Windows look, not the exact Microsoft logo. A slim radio antenna rises from the PC and sends
  signal arcs up into the sky. A small nameplate under the PC reads "Vibepollo".
- The sky: between the two nodes a wide arc of radio waves and signal pulses crosses a calm night sky like a
  bridge. Along the arc, small fragments of the PC screen image (a game frame) travel with the waves and
  reassemble on the right — the stream arrives almost seamlessly.
- Right node, the client: an antenna catches the waves from the sky; it is connected to an Android tablet in
  landscape that shows the same game frame as the PC. A small nameplate reads "KAST".
- Friendship: both antennas share one accent color, and the waves from the left reach the right antenna like
  a handshake — Vibepollo and KAST work together.

Style: modern flat vector logo, clean geometric shapes, consistent line weight, softly rounded corners,
balanced negative space. Palette: deep navy night sky, bright cyan and teal signal waves, a warm amber accent
on both antennas, white screens and text. No glassmorphism, no Liquid Glass, no translucent blurred panels,
no photorealism, no 3D render, no heavy gradients, no clutter.

Text: only the words "KAST" and "Vibepollo", spelled exactly; no other text and no slogans.

Deliverables:
1) a horizontal logo with the full scene and the wordmark "KAST" in a bold modern geometric sans-serif;
2) a square app icon simplified to two antennas and one wave arc between them, readable at 48 x 48 px,
   on a solid navy background;
3) both versions on a transparent background as well, if possible.
```
