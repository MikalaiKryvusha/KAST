# Super Artemis — перевод на ru: таблица для согласования

Новых переводов: **591 из 591** · уже было в приложении: **644** · ошибок проверки: **0** ·
обновлено 2026-10-30 13:44 UTC

⏳ — перевод ещё в работе · ❌ — ошибка проверки (формат, экранирование) · ⚠ — замечание: длиннее английского, совпадает с английским

## 1. Новые переводы — их и согласуем

| № | Ключ | Раздел | English | Русский | Проверка |
|---|---|---|---|---|---|
| 1 | `plurals:special_key_flow_summary` |  | 1 → %1$d step: %2$s<br>остальные → %1$d steps: %2$s | 1, 21, 31… → %1$d шаг: %2$s<br>2–4, 22–24… → %1$d шага: %2$s<br>0, 5–20, 25… → %1$d шагов: %2$s<br>дробные → %1$d шага: %2$s |  |
| 2 | `email_recipient` | Performance Report Sharing | artemistics.logs@gmail.com | artemistics.logs@gmail.com | ⚠ identical to English |
| 3 | `text_native_res_dialog` | Preferences | Your host may not support the native resolution or frame rate of this screen. With Apollo you do not need a custom display mode on the PC. Apollo scales your desktop to the requested size, or creates a virtual display at exactly this size when a virtual display is used, so your monitor is never driven in an unsupported mode. Other hosts may need a matching custom resolution on the PC, which only you can set up there. | Ваш хост может не поддерживать родное разрешение или частоту кадров этого экрана. С Apollo пользовательский режим дисплея на ПК не нужен: Apollo масштабирует рабочий стол до запрошенного размера или, если используется виртуальный дисплей, создаёт его ровно такого размера, поэтому монитор никогда не работает в неподдерживаемом режиме. Другим хостам может потребоваться соответствующее пользовательское разрешение на ПК, и настроить его там можете только вы. |  |
| 4 | `title_checkbox_enable_microphone` | Preferences | Enable microphone streaming | Включить передачу звука с микрофона |  |
| 5 | `summary_checkbox_enable_microphone` | Preferences | Streams your microphone audio to the host PC when the host supports microphone passthrough. | Передаёт звук с вашего микрофона на хост-ПК, если хост поддерживает проброс микрофона. |  |
| 6 | `title_microphone_device_list` | Preferences | Microphone input device | Устройство ввода для микрофона |  |
| 7 | `summary_microphone_device_list` | Preferences | Choose which local microphone Super Artemis captures. Leave this on the default option to follow your system input device. | Выберите, с какого локального микрофона Super Artemis захватывает звук. Оставьте вариант по умолчанию, чтобы использовать системное устройство ввода. |  |
| 8 | `microphone_device_default` | Preferences | Default system microphone | Системный микрофон по умолчанию |  |
| 9 | `title_microphone_preview` | Preferences | Microphone input preview | Проверка сигнала микрофона |  |
| 10 | `microphone_preview_inactive` | Preferences | Microphone preview inactive | Проверка микрофона не активна |  |
| 11 | `microphone_preview_permission_required` | Preferences | Microphone permission is required | Требуется разрешение на доступ к микрофону |  |
| 12 | `microphone_preview_signal_detected` | Preferences | Input detected on the selected microphone. | На выбранном микрофоне обнаружен сигнал. |  |
| 13 | `microphone_preview_signal_missing` | Preferences | No microphone input detected yet. | Сигнал с микрофона пока не обнаружен. |  |
| 14 | `microphone_preview_selected_missing` | Preferences | Selected microphone unavailable, previewing the system default input | Выбранный микрофон недоступен, проверяется системный вход по умолчанию |  |
| 15 | `microphone_preview_default_active` | Preferences | Previewing the default microphone input | Проверяется микрофон по умолчанию |  |
| 16 | `microphone_preview_selected_active` | Preferences | Previewing the selected microphone input | Проверяется выбранный микрофон |  |
| 17 | `microphone_preview_open_failed` | Preferences | Microphone preview unavailable: could not open the selected input | Проверка микрофона недоступна: не удалось открыть выбранный вход |  |
| 18 | `microphone_encoder_setup_failed` | Preferences | Unable to prepare the microphone encoder | Не удалось подготовить кодировщик микрофона |  |
| 19 | `microphone_capture_start_failed` | Preferences | Unable to start microphone capture | Не удалось начать захват микрофона |  |
| 20 | `microphone_permission_denied` | Preferences | Microphone permission denied | Доступ к микрофону запрещён |  |
| 21 | `microphone_host_not_negotiated` | Preferences | Host did not negotiate microphone streaming; leaving client microphone disabled | Хост не согласовал передачу микрофона; микрофон клиента остаётся выключенным |  |
| 22 | `microphone_stream_permission_revoked` | Preferences | Microphone capture skipped because RECORD_AUDIO permission is not granted | Захват микрофона пропущен: не предоставлено разрешение RECORD_AUDIO |  |
| 23 | `microphone_stream_start_failed` | Preferences | Unable to start local microphone capture; continuing without microphone input | Не удалось начать захват локального микрофона; работа продолжается без ввода с микрофона |  |
| 24 | `title_microphone_initial_state` | Preferences | Microphone at stream start | Микрофон при запуске стрима |  |
| 25 | `summary_microphone_initial_state` | Preferences | Off keeps the microphone hardware powered down until you unmute it from the in-stream menu, which saves battery and keeps the privacy indicator off. | При значении «Всегда выключен» микрофон остаётся обесточенным, пока вы не включите его в меню стрима: это экономит заряд батареи, а индикатор конфиденциальности не загорается. |  |
| 26 | `microphone_initial_state_off` | Preferences | Always off | Всегда выключен |  |
| 27 | `microphone_initial_state_on` | Preferences | Always on | Всегда включён |  |
| 28 | `microphone_initial_state_follow_last` | Preferences | Follow last state | Как в прошлый раз |  |
| 29 | `game_menu_mute_microphone` | Preferences | Mute microphone | Выключить микрофон |  |
| 30 | `game_menu_unmute_microphone` | Preferences | Unmute microphone | Включить микрофон |  |
| 31 | `microphone_active` | Preferences | Microphone on | Микрофон включён |  |
| 32 | `microphone_muted` | Preferences | Microphone muted | Микрофон выключен |  |
| 33 | `title_seekbar_network_grace` | Preferences | Network drop grace period | Допустимое время обрыва сети |  |
| 34 | `summary_seekbar_network_grace` | Preferences | How long the stream survives a lost network before the session ends. The host also needs a ping timeout at least this long. | Сколько стрим продержится после потери сети, прежде чем сессия завершится. На хосте тайм-аут пинга тоже должен быть не меньше этого значения. |  |
| 35 | `suffix_seekbar_seconds` | Preferences | s | с |  |
| 36 | `category_backup_restore` | Preferences | Backup and restore | Резервное копирование и восстановление | ⚠ long (18→38 chars) — check layout |
| 37 | `title_backup_settings` | Preferences | Back up settings | Создать резервную копию настроек | ⚠ long (16→32 chars) — check layout |
| 38 | `summary_backup_settings` | Preferences | Save every setting, layout and PC to one file, or share it to another device | Сохранить все настройки, раскладки и ПК в один файл или отправить его на другое устройство |  |
| 39 | `title_restore_settings` | Preferences | Restore settings | Восстановить настройки |  |
| 40 | `summary_restore_settings` | Preferences | Apply a backup file after a preview of what changes | Применить файл резервной копии, предварительно посмотрев, что изменится |  |
| 41 | `backup_include_pairing_keys` | Preferences | Include pairing keys | Включить ключи сопряжения |  |
| 42 | `backup_dialog_summary` | Preferences | Saves every setting, your menu and control layouts, profiles and PC list. | Сохраняет все настройки, раскладки меню и элементов управления, профили и список ПК. |  |
| 43 | `backup_keys_benefit` | Preferences | A restored copy connects to your PCs without pairing again. | Восстановленная копия подключается к вашим ПК без повторного сопряжения. |  |
| 44 | `backup_keys_caution` | Preferences | Anyone with this file can connect to your PCs as this device. Keep it private and never share it. | Любой, у кого есть этот файл, может подключиться к вашим ПК от имени этого устройства. Храните его в тайне и никому не передавайте. |  |
| 45 | `backup_choose_location` | Preferences | Choose location | Выбрать место |  |
| 46 | `backup_success` | Preferences | Backup saved | Резервная копия сохранена | ⚠ long (12→25 chars) — check layout |
| 47 | `backup_failed` | Preferences | Backup failed: %1$s | Не удалось создать резервную копию: %1$s | ⚠ long (19→40 chars) — check layout |
| 48 | `restore_preview_title` | Preferences | Restore this backup | Восстановить эту резервную копию | ⚠ long (19→32 chars) — check layout |
| 49 | `restore_detail_created` | Preferences | Created | Создана |  |
| 50 | `restore_detail_version` | Preferences | App version | Версия приложения |  |
| 51 | `restore_detail_contents` | Preferences | Contains | Содержимое |  |
| 52 | `restore_contents_value` | Preferences | %1$s, %2$s | %1$s, %2$s |  |
| 53 | `restore_unknown` | Preferences | Unknown | Неизвестно |  |
| 54 | `plurals:restore_settings_count` | Preferences | 1 → %d setting<br>остальные → %d settings | 1, 21, 31… → %d настройка<br>2–4, 22–24… → %d настройки<br>0, 5–20, 25… → %d настроек<br>дробные → %d настройки |  |
| 55 | `plurals:restore_pcs_count` | Preferences | 1 → %d PC<br>остальные → %d PCs | 1, 21, 31… → %d ПК<br>2–4, 22–24… → %d ПК<br>0, 5–20, 25… → %d ПК<br>дробные → %d ПК |  |
| 56 | `plurals:restore_outcome_keep_pcs` | Preferences | 1 → Your %d PC is kept as it is.<br>остальные → Your %d PCs are kept as they are. | 1, 21, 31… → Ваш %d ПК останется без изменений.<br>2–4, 22–24… → Ваши %d ПК останутся без изменений.<br>0, 5–20, 25… → Ваши %d ПК останутся без изменений.<br>дробные → Ваши %d ПК останутся без изменений. |  |
| 57 | `plurals:restore_outcome_new_pcs` | Preferences | 1 → %d PC from the backup is added.<br>остальные → %d PCs from the backup are added. | 1, 21, 31… → Из резервной копии будет добавлен %d ПК.<br>2–4, 22–24… → Из резервной копии будут добавлены %d ПК.<br>0, 5–20, 25… → Из резервной копии будет добавлено %d ПК.<br>дробные → Из резервной копии будет добавлено %d ПК. |  |
| 58 | `plurals:restore_outcome_new_pcs_pair` | Preferences | 1 → %d PC from the backup is added. Pair it again to stream, because this backup has no pairing keys.<br>остальные → %d PCs from the backup are added. Pair them again to stream, because this backup has no pairing keys. | 1, 21, 31… → Из резервной копии будет добавлен %d ПК. Для стрима выполните сопряжение с ним заново: в этой копии нет ключей сопряжения.<br>2–4, 22–24… → Из резервной копии будут добавлены %d ПК. Для стрима выполните сопряжение с ними заново: в этой копии нет ключей сопряжения.<br>0, 5–20, 25… → Из резервной копии будет добавлено %d ПК. Для стрима выполните сопряжение с ними заново: в этой копии нет ключей сопряжения.<br>дробные → Из резервной копии будет добавлено %d ПК. Для стрима выполните сопряжение с ними заново: в этой копии нет ключей сопряжения. |  |
| 59 | `restore_outcome_no_pcs` | Preferences | No PCs are added or removed. | ПК не будут добавлены или удалены. |  |
| 60 | `restore_outcome_replace_keys` | Preferences | This backup includes pairing keys. Your PC list and this device\'s pairing keys are replaced with the ones in the backup. | Эта резервная копия содержит ключи сопряжения. Список ПК и ключи сопряжения этого устройства будут заменены данными из копии. |  |
| 61 | `restore_preview_note` | Preferences | Ticked parts replace what this device has now. The app restarts when the restore finishes. | Отмеченные разделы заменят то, что сейчас есть на этом устройстве. После восстановления приложение перезапустится. |  |
| 62 | `restore_apply` | Preferences | Restore | Восстановить | ⚠ long (7→12 chars) — check layout |
| 63 | `backup_save_to_device` | Preferences | Save to device | Сохранить на устройство | ⚠ long (14→23 chars) — check layout |
| 64 | `backup_share` | Preferences | Share | Поделиться | ⚠ long (5→10 chars) — check layout |
| 65 | `backup_share_subject` | Preferences | Super Artemis settings backup | Резервная копия настроек Super Artemis |  |
| 66 | `backup_use_password` | Preferences | Protect with a password | Защитить паролем |  |
| 67 | `backup_password_summary` | Preferences | The file is encrypted, and only this password can open it on any device. | Файл шифруется, и открыть его на любом устройстве можно только с этим паролем. |  |
| 68 | `backup_password_required` | Preferences | Needed when pairing keys are included, so nobody else can use them. | Обязателен, если включены ключи сопряжения, чтобы никто другой не смог ими воспользоваться. |  |
| 69 | `backup_password_hint` | Preferences | Password | Пароль |  |
| 70 | `backup_password_confirm_hint` | Preferences | Repeat the password | Повторите пароль |  |
| 71 | `backup_password_too_short` | Preferences | Use at least %1$d characters. | Используйте не менее %1$d символов. |  |
| 72 | `backup_password_mismatch` | Preferences | The two passwords are different. | Пароли не совпадают. |  |
| 73 | `restore_password_title` | Preferences | Password protected backup | Резервная копия защищена паролем |  |
| 74 | `restore_password_message` | Preferences | Enter the password used when this backup was made. | Введите пароль, заданный при создании этой резервной копии. |  |
| 75 | `restore_password_wrong` | Preferences | That password did not open this backup. Try again. | Этот пароль не подходит к резервной копии. Попробуйте ещё раз. |  |
| 76 | `restore_password_wrong_inline` | Preferences | Wrong password | Неверный пароль |  |
| 77 | `restore_unlock` | Preferences | Unlock | Разблокировать | ⚠ long (6→14 chars) — check layout |
| 78 | `restore_unlocking` | Preferences | Unlocking the backup | Разблокировка резервной копии |  |
| 79 | `restore_details_value` | Preferences | Made %1$s on %2$s, Super Artemis %3$s | Создана %1$s на %2$s, Super Artemis %3$s |  |
| 80 | `restore_choose_parts` | Preferences | What to restore | Что восстановить |  |
| 81 | `restore_part_settings` | Preferences | Settings | Настройки |  |
| 82 | `restore_part_layouts` | Preferences | Special keys and layouts | Спец-клавиши и раскладки |  |
| 83 | `restore_part_layouts_detail` | Preferences | Special keys, on-screen controls and keyboard layouts | Спец-клавиши, экранные кнопки и раскладки клавиатуры |  |
| 84 | `restore_part_profiles` | Preferences | Profiles | Профили |  |
| 85 | `restore_part_profiles_detail` | Preferences | Your settings profiles | Ваши профили настроек |  |
| 86 | `restore_part_pcs` | Preferences | PCs | ПК |  |
| 87 | `restore_part_keys` | Preferences | Pairing keys | Ключи сопряжения |  |
| 88 | `restore_part_keys_detail` | Preferences | This device becomes the device that made the backup, so its PCs connect without pairing again | Это устройство станет тем, на котором создана копия, и его ПК подключатся без повторного сопряжения |  |
| 89 | `restore_device_issues` | Preferences | Settings this device cannot use as they are | Настройки, которые это устройство не может использовать как есть |  |
| 90 | `restore_device_issues_hint` | Preferences | Unticked settings keep this device\'s current value. Tick one to restore it anyway. | Для неотмеченных настроек сохранится текущее значение этого устройства. Отметьте настройку, чтобы всё равно восстановить её. |  |
| 91 | `restore_issue_keep_local` | Preferences | Keeps this device\'s value unless ticked | Сохраняется значение этого устройства, если не отмечено |  |
| 92 | `restore_issue_resolution` | Preferences | Resolution %1$s does not fit this screen (%2$s) | Разрешение %1$s не подходит для этого экрана (%2$s) |  |
| 93 | `restore_issue_fps` | Preferences | %1$s FPS is more than this screen shows (%2$d Hz) | %1$s FPS — больше, чем показывает этот экран (%2$d Гц) |  |
| 94 | `restore_issue_hdr` | Preferences | HDR, which this screen does not support | HDR, который этот экран не поддерживает |  |
| 95 | `restore_issue_motion` | Preferences | Motion sensor controls, but this device has no gyroscope | Управление датчиками движения, но на этом устройстве нет гироскопа |  |
| 96 | `restore_issue_vibration` | Preferences | Vibration, but this device cannot vibrate | Вибрация, но это устройство не умеет вибрировать |  |
| 97 | `restore_issue_microphone` | Preferences | A microphone chosen on the other device | Микрофон, выбранный на другом устройстве |  |
| 98 | `restore_success` | Preferences | Settings restored, restarting | Настройки восстановлены, перезапуск |  |
| 99 | `restore_failed` | Preferences | Restore failed: %1$s | Не удалось восстановить: %1$s |  |
| 100 | `category_about` | Preferences | About | О приложении | ⚠ long (5→12 chars) — check layout |
| 101 | `title_support` | Preferences | Support development | Поддержать разработку |  |
| 102 | `summary_support` | Preferences | Super Artemis is free. Support it with UPI or PayPal | Super Artemis бесплатен. Поддержите его через UPI или PayPal |  |
| 103 | `support_intro` | Preferences | Super Artemis is free and open source, with no ads. If it makes your streaming better, you can support its development. | Super Artemis — бесплатное приложение с открытым исходным кодом и без рекламы. Если оно делает ваш стриминг лучше, вы можете поддержать его разработку. |  |
| 104 | `support_pay_upi_app` | Preferences | Pay with a UPI app | Оплатить через приложение UPI | ⚠ long (18→29 chars) — check layout |
| 105 | `support_qr_description` | Preferences | UPI QR code for supporting Super Artemis | QR-код UPI для поддержки Super Artemis |  |
| 106 | `support_qr_caption` | Preferences | Scan with any UPI app, or pay from this device | Отсканируйте любым приложением UPI или оплатите с этого устройства |  |
| 107 | `support_copy` | Preferences | Copy | Копировать | ⚠ long (4→10 chars) — check layout |
| 108 | `support_upi_copied` | Preferences | UPI ID copied | UPI ID скопирован |  |
| 109 | `support_no_upi_app` | Preferences | No UPI app found on this device. The UPI ID is copied, so you can paste it in any payment app. | На этом устройстве не найдено приложение UPI. UPI ID скопирован, его можно вставить в любое платёжное приложение. |  |
| 110 | `support_paypal` | Preferences | PayPal | PayPal | ⚠ identical to English |
| 111 | `support_sponsors` | Preferences | GitHub Sponsors | GitHub Sponsors | ⚠ identical to English |
| 112 | `support_sponsors_summary` | Preferences | One time or monthly support through GitHub | Разовая или ежемесячная поддержка через GitHub |  |
| 113 | `support_paypal_summary` | Preferences | Cards or PayPal balance, from any country | Картой или с баланса PayPal из любой страны |  |
| 114 | `support_upi_title` | Preferences | UPI | UPI | ⚠ identical to English |
| 115 | `developer_name` | Preferences | Mohit Arora | Mohit Arora | ⚠ identical to English |
| 116 | `developer_role` | Preferences | Developer of Super Artemis | Разработчик Super Artemis |  |
| 117 | `title_developer_profiles` | Preferences | Developer | Разработчик |  |
| 118 | `summary_developer_profiles` | Preferences | Mohit Arora (Arora-Sir): website, GitHub, LinkedIn and X | Mohit Arora (Arora-Sir): сайт, GitHub, LinkedIn и X |  |
| 119 | `developer_find_me` | Preferences | Find me on | Где меня найти |  |
| 120 | `developer_built_on_title` | Preferences | Built on | Основа |  |
| 121 | `developer_built_on_body` | Preferences | Super Artemis is a fork of Artemis by %1$s, which builds on Moonlight by %2$s and its contributors. | Super Artemis — форк Artemis от %1$s, который основан на Moonlight от %2$s и участников проекта. |  |
| 122 | `developer_all_credits` | Preferences | All credits | Все благодарности |  |
| 123 | `profile_website` | Preferences | Website | Сайт |  |
| 124 | `profile_github` | Preferences | GitHub | GitHub | ⚠ identical to English |
| 125 | `profile_linkedin` | Preferences | LinkedIn | LinkedIn | ⚠ identical to English |
| 126 | `profile_x` | Preferences | X | X |  |
| 127 | `title_credits` | Preferences | Credits and thanks | Авторы и благодарности |  |
| 128 | `summary_credits` | Preferences | Everyone whose code, design or request shaped Super Artemis | Все, чей код, дизайн или запрос повлиял на Super Artemis |  |
| 129 | `credits_intro` | Preferences | Super Artemis builds on the work of these people and projects. Tap a name or a link to open it. | Super Artemis опирается на работу этих людей и проектов. Нажмите на имя или ссылку, чтобы открыть её. |  |
| 130 | `credits_by` | Preferences | by | от |  |
| 131 | `title_source_code` | Preferences | Source code on GitHub | Исходный код на GitHub |  |
| 132 | `summary_source_code` | Preferences | Star it, follow releases or contribute. Licensed under GPLv3 | Поставьте звезду, следите за выпусками или внесите вклад. Лицензия GPLv3 |  |
| 133 | `title_report_issue` | Preferences | Report an issue | Сообщить о проблеме |  |
| 134 | `summary_report_issue` | Preferences | Bug reports and feature requests on GitHub | Сообщения об ошибках и запросы функций на GitHub |  |
| 135 | `title_about_version` | Preferences | Version | Версия |  |
| 136 | `summary_about_version` | Preferences | %1$s (%2$s). Tap for release notes | %1$s (%2$s). Нажмите, чтобы посмотреть список изменений |  |
| 137 | `category_stream_controls` | Preferences | In-stream controls | Управление во время стрима |  |
| 138 | `category_session` | Preferences | Starting and leaving a stream | Запуск и завершение стрима |  |
| 139 | `category_full_keyboard` | Preferences | Built-in keyboard | Встроенная клавиатура |  |
| 140 | `title_release_keys_on_close` | Preferences | Release held keys when the keyboard closes | Отпускать зажатые клавиши при закрытии клавиатуры |  |
| 141 | `summary_release_keys_on_close` | Preferences | Lets go of every key still held, including Ctrl, Alt, Shift or Win held with a long press, as soon as the built-in keyboard hides. Turn off to keep them held, for example for Shift-clicking. | Отпускает все ещё зажатые клавиши, включая Ctrl, Alt, Shift или Win, удерживаемые долгим нажатием, как только встроенная клавиатура скрывается. Выключите, чтобы они оставались зажатыми, например для щелчков с Shift. |  |
| 142 | `search_settings_hint` | Preferences | Search settings | Поиск настроек |  |
| 143 | `expand_button_title` | Preferences | Show more | Показать ещё |  |
| 144 | `keywords_gestures` | Preferences | three finger, four finger, five finger, 3 finger, 4 finger, 5 finger, multi-finger, multitouch, gesture, tap, double tap, swipe, touch shortcut, multi-touch gestures, multitouch mode | три пальца, четыре пальца, пять пальцев, 3 пальца, 4 пальца, 5 пальцев, несколько пальцев, мультитач, жест, касание, тап, двойное касание, двойной тап, свайп, сенсорный ярлык, мультитач-жесты, режим мультитач, multitouch, gesture |  |
| 145 | `keywords_quick_bar` | Preferences | quick bar, toolbar, buttons, corner, pin, shortcut, overlay, row, column, pan zoom button, mic button | быстрая панель, панель инструментов, кнопки, угол, закрепить, ярлык, оверлей, строка, столбец, кнопка прокрутки/масштаба, кнопка микрофона, quick bar, toolbar |  |
| 146 | `keywords_game_menu` | Preferences | quick menu, in-stream menu, menu style, grid, list, compact, customize, layout, actions | быстрое меню, меню стрима, стиль меню, сетка, список, компактный, настроить, раскладка, действия, quick menu |  |
| 147 | `keywords_special_keys` | Preferences | special keys, custom keys, shortcut, hotkey, key combination, macro, keyboard shortcut, esc, alt f4, ctrl, icons | спец-клавиши, специальные клавиши, пользовательские клавиши, ярлык, горячая клавиша, сочетание клавиш, макрос, клавиатурное сокращение, esc, alt f4, ctrl, значки, иконки, hotkey, macro |  |
| 148 | `keywords_back_menu` | Preferences | back button, back key, back gesture, menu | кнопка назад, клавиша назад, жест назад, меню, back |  |
| 149 | `keywords_floating_button` | Preferences | menu button, floating, bubble, overlay button | кнопка меню, плавающая, пузырь, кнопка поверх экрана, floating |  |
| 150 | `keywords_background` | Preferences | background, recents, resume, reconnect, picture in picture, pip, home, minimize, leave, battery, disconnect | фон, фоновый режим, недавние, возобновить, переподключиться, картинка в картинке, pip, домой, свернуть, выйти, батарея, отключиться |  |
| 151 | `keywords_auto_connect` | Preferences | auto connect, autoconnect, start, startup, last pc, launch | автоподключение, автоматическое подключение, запуск, при запуске, последний ПК, открыть, auto connect |  |
| 152 | `keywords_app_style` | Preferences | theme, material you, material 3, dynamic color, wallpaper, colors, dark, switches, style, look, classic | тема, material you, material 3, динамический цвет, обои, цвета, тёмная тема, переключатели, стиль, внешний вид, классический |  |
| 153 | `keywords_backup` | Preferences | backup, export, save settings, transfer, new phone | резервная копия, бэкап, экспорт, сохранить настройки, перенос, новый телефон, backup |  |
| 154 | `keywords_restore` | Preferences | restore, import, load settings, transfer | восстановление, восстановить, импорт, загрузить настройки, перенос, restore |  |
| 155 | `keywords_support` | Preferences | donate, donation, upi, paypal, support, tip, sponsor, qr | пожертвование, донат, поддержать, upi, paypal, поддержка, чаевые, спонсор, qr |  |
| 156 | `keywords_developer` | Preferences | developer, author, website, github, linkedin, twitter, x, profile | разработчик, автор, сайт, github, linkedin, twitter, x, профиль |  |
| 157 | `keywords_credits` | Preferences | credits, thanks, contributors, acknowledgements, open source, licenses | благодарности, спасибо, участники, контрибьюторы, открытый исходный код, open source, лицензии |  |
| 158 | `keywords_source` | Preferences | github, source code, star, repository, open source, license, gpl | github, исходный код, звезда, star, репозиторий, открытый исходный код, open source, лицензия, gpl |  |
| 159 | `keywords_issue` | Preferences | bug, issue, report, feedback, feature request, crash | баг, ошибка, проблема, сообщить, отзыв, обратная связь, запрос функции, сбой, вылет |  |
| 160 | `keywords_privacy` | Preferences | privacy, data, permissions, tracking | конфиденциальность, приватность, данные, разрешения, отслеживание |  |
| 161 | `keywords_version` | Preferences | version, release notes, changelog, update, what is new | версия, примечания к выпуску, список изменений, changelog, обновление, что нового |  |
| 162 | `keywords_microphone` | Preferences | mic, microphone, voice, talk, chat, discord | мик, микрофон, голос, говорить, чат, discord |  |
| 163 | `keywords_network_grace` | Preferences | wifi, wi-fi, timeout, disconnect, network drop, connection lost, ping | wifi, wi-fi, вайфай, тайм-аут, таймаут, отключение, обрыв сети, потеря соединения, ping, пинг |  |
| 164 | `keywords_release_keys` | Preferences | stuck keys, held keys, keys stay pressed, release, modifier, sticky | залипшие клавиши, зажатые клавиши, клавиши остаются нажатыми, отпустить, модификатор, залипание |  |
| 165 | `keywords_sticky_keys` | Preferences | sticky, hold, latch, modifier, shift, ctrl, alt, win | залипание, фиксированные, удержание, фиксация, модификатор, shift, ctrl, alt, win |  |
| 166 | `keywords_full_keyboard` | Preferences | full keyboard, built-in keyboard, on-screen keyboard, transparency, size | полная клавиатура, полноэкранная клавиатура, встроенная клавиатура, экранная клавиатура, прозрачность, размер |  |
| 167 | `keywords_pan_zoom` | Preferences | pan, zoom, magnify | прокрутка, масштаб, масштабирование, увеличение, лупа, pan, zoom | ⚠ long (18→64 chars) — check layout |
| 168 | `keywords_resolution` | Preferences | resolution, 1080p, 1440p, 4k, native, sharpness, quality | разрешение, 1080p, 1440p, 4k, нативное, родное, чёткость, качество |  |
| 169 | `keywords_fps` | Preferences | fps, frame rate, 120, 90, 60, refresh rate, smooth | fps, частота кадров, кадры, 120, 90, 60, частота обновления, плавность |  |
| 170 | `keywords_bitrate` | Preferences | bitrate, mbps, quality, bandwidth | битрейт, мбит/с, mbps, качество, пропускная способность |  |
| 171 | `keywords_frame_pacing` | Preferences | stutter, smoothness, latency, pacing | рывки, фризы, статтер, плавность, задержка, вывод кадров, pacing |  |
| 172 | `keywords_mouse_mode` | Preferences | trackpad, touchpad, mouse, pointer, cursor, touch mode, direct touch | трекпад, тачпад, мышь, указатель, курсор, режим сенсора, прямое касание |  |
| 173 | `keywords_language` | Preferences | language, translation, locale | язык, перевод, локаль, language |  |
| 174 | `keywords_virtual_keys` | Preferences | virtual keys, on-screen keys, special key layout, buttons on screen | виртуальные клавиши, экранные клавиши, раскладка спец-клавиш, кнопки на экране |  |
| 175 | `keywords_onscreen_controls` | Preferences | on-screen gamepad, virtual controller, touch controls, joystick | экранный геймпад, виртуальный контроллер, сенсорное управление, экранные кнопки, джойстик |  |
| 176 | `keywords_perf_overlay` | Preferences | performance, stats, fps counter, latency, hud, overlay | производительность, статистика, счётчик fps, задержка, hud, оверлей, панель |  |
| 177 | `special_keys_hint` | Preferences | Shown in Send special keys and ready for quick-action bars and gestures. Drag to reorder, tap a key to edit it. | Отображаются в меню «Отправить спец-клавиши» и доступны для панелей быстрых действий и жестов. Перетащите, чтобы изменить порядок; нажмите на клавишу, чтобы изменить её. |  |
| 178 | `special_keys_hidden_header` | Preferences | Hidden built-in keys | Скрытые встроенные клавиши |  |
| 179 | `special_keys_reset` | Preferences | Reset built-in keys | Сбросить встроенные клавиши |  |
| 180 | `special_keys_reset_confirm` | Preferences | Show every built-in key again with its default icon and order? Your own keys stay as they are. | Снова показать все встроенные клавиши со стандартными значками и в стандартном порядке? Ваши собственные клавиши останутся без изменений. |  |
| 181 | `special_key_built_in` | Preferences | %1$s, built-in | %1$s, встроенная |  |
| 182 | `special_key_hide` | Preferences | Hide this key | Скрыть эту клавишу |  |
| 183 | `special_key_show` | Preferences | Show this key again | Снова показать эту клавишу |  |
| 184 | `special_key_icon_hint` | Preferences | Pick the icon shown in menus and on quick-action bars. Tap it again for the default icon. | Выберите значок, который будет показан в меню и на панелях быстрых действий. Нажмите на него ещё раз, чтобы вернуть стандартный значок. |  |
| 185 | `about_no_app_for_link` | Preferences | No app can open %1$s | Нет приложения для открытия %1$s |  |
| 186 | `title_presets` | Preferences | Quick setups | Быстрая настройка |  |
| 187 | `summary_presets_off` | Preferences | Competitive play, Everyday desktop, Best picture or Battery saver. Off, your own settings are in use. | Соревновательная игра, Повседневная работа, Лучшее изображение или Экономия заряда. Выключено, используются ваши собственные настройки. |  |
| 188 | `summary_presets_on` | Preferences | %1$s is on. Your own settings are kept and come back when you switch it off. | Включён пресет «%1$s». Ваши собственные настройки сохранены и вернутся, когда вы его выключите. |  |
| 189 | `summary_presets_edited` | Preferences | %1$s, with changes you made afterwards | %1$s, с вашими последующими изменениями |  |
| 190 | `keywords_presets` | Preferences | quick setup, setup, preset, presets, latency, quality, battery, performance, bitrate, profile, tune, fast, low latency, best quality | быстрая настройка, настройка, пресет, пресеты, задержка, качество, батарея, заряд, производительность, битрейт, профиль, тонкая настройка, быстро, низкая задержка, лучшее качество |  |
| 191 | `presets_hint` | Preferences | A quick setup only changes the settings listed before you apply it. It never changes the resolution, the PC or the controls. | Пресет меняет только те настройки, которые перечислены перед его применением. Разрешение, ПК и управление он никогда не меняет. |  |
| 192 | `presets_save_current` | Preferences | Save my settings as a profile | Сохранить мои настройки как профиль |  |
| 193 | `presets_save_hint` | Preferences | The settings the presets cover, as they are now, so you can switch back to them from Profiles. | Настройки, которые затрагивают пресеты, в их текущем виде — чтобы к ним можно было вернуться в разделе «Профили». |  |
| 194 | `presets_profile_name_hint` | Preferences | Profile name | Имя профиля |  |
| 195 | `presets_profile_default_name` | Preferences | My tuned settings | Мои подобранные настройки |  |
| 196 | `presets_profile_saved` | Preferences | Saved as the profile %1$s | Сохранено как профиль «%1$s» |  |
| 197 | `presets_use_own` | Preferences | Use my own settings | Использовать мои настройки |  |
| 198 | `presets_own_on` | Preferences | Your own settings are in use again | Снова используются ваши собственные настройки |  |
| 199 | `presets_good_for` | Preferences | Good for | Чем хорош |  |
| 200 | `presets_costs` | Preferences | What it costs | Чем придётся платить |  |
| 201 | `presets_changes` | Preferences | Settings that change | Какие настройки изменятся |  |
| 202 | `presets_change_line` | Preferences | %1$s: %2$s to %3$s | %1$s: %2$s → %3$s |  |
| 203 | `presets_change_same` | Preferences | %1$s: already %2$s | %1$s: уже %2$s |  |
| 204 | `presets_safe_note` | Preferences | Nothing is overwritten. Your current values are saved as the profile %1$s, and Use my own settings switches the quick setup off. | Ничего не перезаписывается. Текущие значения сохраняются как профиль «%1$s», а «Использовать мои настройки» выключает пресет. |  |
| 205 | `presets_apply` | Preferences | Apply | Применить |  |
| 206 | `presets_applied` | Preferences | %1$s is on | Включён пресет «%1$s» | ⚠ long (10→21 chars) — check layout |
| 207 | `preset_before_name` | Preferences | Before %1$s | До: %1$s |  |
| 208 | `preset_value_on` | Preferences | On | Вкл. |  |
| 209 | `preset_value_off` | Preferences | Off | Выкл. |  |
| 210 | `preset_value_default` | Preferences | Default | По умолчанию | ⚠ long (7→12 chars) — check layout |
| 211 | `preset_value_mbps` | Preferences | %1$.0f Mbps | %1$.0f Мбит/с |  |
| 212 | `preset_lowest_latency` | Preferences | Competitive play | Соревновательная игра |  |
| 213 | `preset_lowest_latency_hint` | Preferences | Fastest response for games: 30 Mbps, HDR off, frame pacing for latency | Самый быстрый отклик в играх: 30 Мбит/с, HDR выкл., вывод кадров с наименьшей задержкой |  |
| 214 | `preset_balanced_hint` | Preferences | Sharp and steady for work and browsing: 50 Mbps, balanced pacing | Чётко и стабильно для работы и браузера: 50 Мбит/с, сбалансированный вывод кадров |  |
| 215 | `preset_best_quality_hint` | Preferences | Sharpest on a good network: 100 Mbps, smoothest pacing | Максимальная чёткость в хорошей сети: 100 Мбит/с, самый плавный вывод кадров |  |
| 216 | `preset_battery_saver_hint` | Preferences | Cooler and longer lasting: 20 Mbps at 60 fps | Меньше нагрев и дольше работа: 20 Мбит/с при 60 FPS |  |
| 217 | `preset_lowest_latency_summary` | Preferences | The shortest delay between a touch and the picture. | Минимальная задержка между касанием и изображением. |  |
| 218 | `preset_lowest_latency_pros` | Preferences | Shortest delay and the most direct input on a good Wi-Fi 5 GHz or wired connection. | Наименьшая задержка и самый прямой отклик на ввод при хорошем Wi-Fi 5 ГГц или проводном подключении. |  |
| 219 | `preset_lowest_latency_cons` | Preferences | A lower bitrate softens fast motion, and frames can drop on a weak network. | Пониженный битрейт размывает быстрое движение, а в слабой сети возможны пропуски кадров. |  |
| 220 | `preset_balanced` | Preferences | Everyday desktop | Повседневная работа |  |
| 221 | `preset_balanced_summary` | Preferences | A middle road for everyday desktop use. | Золотая середина для повседневной работы с рабочим столом. |  |
| 222 | `preset_balanced_pros` | Preferences | A steady picture with a modest delay. | Стабильное изображение при умеренной задержке. |  |
| 223 | `preset_balanced_cons` | Preferences | A little more delay than Competitive play. | Задержка чуть больше, чем в «Соревновательной игре». |  |
| 224 | `preset_best_quality` | Preferences | Best picture | Лучшее изображение |  |
| 225 | `preset_best_quality_summary` | Preferences | The sharpest picture at a high bitrate. | Самое чёткое изображение при высоком битрейте. |  |
| 226 | `preset_best_quality_pros` | Preferences | The best detail in text and motion. | Лучшая детализация текста и движения. |  |
| 227 | `preset_best_quality_cons` | Preferences | Needs a strong connection, adds delay and uses more battery and data. | Требует хорошего соединения, увеличивает задержку и расходует больше заряда и трафика. |  |
| 228 | `preset_battery_saver` | Preferences | Battery saver | Экономия заряда |  |
| 229 | `preset_battery_saver_summary` | Preferences | A lower frame rate and bitrate to save battery and data. | Пониженные частота кадров и битрейт для экономии заряда и трафика. |  |
| 230 | `preset_battery_saver_pros` | Preferences | The longest battery life and the lowest data use. | Самая долгая работа от батареи и наименьший расход трафика. |  |
| 231 | `preset_battery_saver_cons` | Preferences | Less smooth and less sharp than the other presets. | Менее плавно и менее чётко, чем в других пресетах. |  |
| 232 | `title_update_check` | Preferences | Check for updates | Проверить обновления |  |
| 233 | `summary_update_check` | Preferences | Asks GitHub for the newest release when you tap. Nothing is sent at any other time. | По нажатию запрашивает у GitHub последний релиз. В остальное время ничего не отправляется. |  |
| 234 | `keywords_update_check` | Preferences | update, upgrade, new version, release, latest, github, obtainium | обновление, обновить, новая версия, релиз, последняя, github, obtainium |  |
| 235 | `update_consent_title` | Preferences | Check for updates | Проверка обновлений |  |
| 236 | `update_consent_message` | Preferences | Super Artemis will ask GitHub for the newest release, once, each time you tap Check for updates. The request is anonymous: it carries no account, device ID or app version, and nothing is saved from the answer. Nothing is downloaded or installed by the app.  For automatic update alerts without this, follow the app with Obtainium instead. | Super Artemis будет запрашивать у GitHub последний релиз — один раз при каждом нажатии «Проверить обновления». Запрос анонимный: в нём нет ни учётной записи, ни идентификатора устройства, ни версии приложения, и из ответа ничего не сохраняется. Приложение ничего не скачивает и не устанавливает.  Чтобы получать уведомления об обновлениях автоматически и без этого, следите за приложением через Obtainium. |  |
| 237 | `update_consent_check` | Preferences | Check now | Проверить сейчас | ⚠ long (9→16 chars) — check layout |
| 238 | `update_checking` | Preferences | Checking for updates | Проверка обновлений |  |
| 239 | `update_available_title` | Preferences | Version %1$s is available | Доступна версия %1$s |  |
| 240 | `update_available_summary` | Preferences | You have %1$s | Ваша версия: %1$s |  |
| 241 | `update_open_release` | Preferences | Open release page | Открыть страницу релиза |  |
| 242 | `update_later` | Preferences | Later | Позже |  |
| 243 | `update_current_title` | Preferences | You have the newest version | У вас последняя версия |  |
| 244 | `update_current_summary` | Preferences | Version %1$s is the latest release. | Версия %1$s — последний релиз. |  |
| 245 | `update_none_title` | Preferences | No release yet | Релизов пока нет |  |
| 246 | `update_none_summary` | Preferences | GitHub has no published release to compare with. | На GitHub нет опубликованного релиза для сравнения. |  |
| 247 | `update_failed_title` | Preferences | Could not check | Не удалось проверить |  |
| 248 | `update_failed_summary` | Preferences | GitHub could not be reached. Check the connection, or open the releases page yourself. | Не удалось подключиться к GitHub. Проверьте соединение или откройте страницу релизов вручную. |  |
| 249 | `update_open_releases` | Preferences | Open releases | Открыть релизы |  |
| 250 | `title_amoled_black` | Preferences | Pure black | Чистый чёрный |  |
| 251 | `summary_amoled_black` | Preferences | Black windows and dialogs for OLED screens, with the accent kept for switches and buttons | Чёрные окна и диалоги для OLED-экранов; акцентный цвет остаётся у переключателей и кнопок |  |
| 252 | `keywords_amoled_black` | Preferences | amoled, oled, black, dark, battery, pitch black, theme, surface lift, lift, tint, grey, card brightness | amoled, oled, чёрный, тёмный, батарея, глубокий чёрный, тема, подъём поверхностей, подъём, оттенок, серый, яркость карточек |  |
| 253 | `title_app_style` | Preferences | App style | Стиль приложения | ⚠ long (9→16 chars) — check layout |
| 254 | `app_style_classic` | Preferences | Classic | Классический | ⚠ long (7→12 chars) — check layout |
| 255 | `app_style_material_you` | Preferences | Material You | Material You | ⚠ identical to English |
| 256 | `app_style_picker_hint` | Preferences | Sets the colors and controls of Settings, dialogs and the in-stream menus. The stream itself never changes. | Задаёт цвета и элементы управления в настройках, диалогах и меню во время стрима. Сам стрим не меняется. |  |
| 257 | `app_style_classic_description` | Preferences | Neutral greys and checkboxes, the look Artemis has always had | Нейтральные серые тона и флажки — привычный вид Artemis |  |
| 258 | `app_style_material_you_description` | Preferences | Your color scheme, switches and rounded sections | Ваша цветовая схема, переключатели и скруглённые разделы |  |
| 259 | `app_style_scheme` | Preferences | Color scheme (Material You) | Цветовая схема (Material You) |  |
| 260 | `app_style_scheme_named` | Preferences | Color scheme: %1$s | Цветовая схема: %1$s |  |
| 261 | `app_style_apply` | Preferences | Apply | Применить |  |
| 262 | `color_scheme_wallpaper` | Preferences | Wallpaper | Обои |  |
| 263 | `color_scheme_blue` | Preferences | Blue | Синий |  |
| 264 | `color_scheme_teal` | Preferences | Teal | Бирюзовый | ⚠ long (4→9 chars) — check layout |
| 265 | `color_scheme_green` | Preferences | Green | Зелёный |  |
| 266 | `color_scheme_purple` | Preferences | Purple | Фиолетовый |  |
| 267 | `color_scheme_orange` | Preferences | Orange | Оранжевый |  |
| 268 | `color_scheme_rose` | Preferences | Rose | Розовый |  |
| 269 | `color_scheme_mono` | Preferences | Mono | Моно |  |
| 270 | `color_scheme_amber` | Preferences | Amber | Янтарный |  |
| 271 | `color_scheme_add` | Preferences | Pick a custom color | Выбрать свой цвет |  |
| 272 | `color_scheme_in_use` | Preferences | in use | используется | ⚠ long (6→12 chars) — check layout |
| 273 | `color_scheme_custom` | Preferences | Custom | Свой |  |
| 274 | `color_picker_title` | Preferences | Custom color | Свой цвет |  |
| 275 | `color_picker_hint` | Preferences | Drag to pick a color or type its hex code. The app grows its accent tones from it. | Перетащите, чтобы выбрать цвет, или введите его HEX-код. Приложение построит на его основе акцентные оттенки. |  |
| 276 | `color_picker_hex_hint` | Preferences | Hex code, such as 2196F3 | HEX-код, например 2196F3 |  |
| 277 | `color_picker_use` | Preferences | Use color | Использовать цвет | ⚠ long (9→17 chars) — check layout |
| 278 | `color_picker_reset` | Preferences | Reset | Сбросить |  |
| 279 | `color_picker_area` | Preferences | Color area, drag to choose a color | Цветовая область, перетащите, чтобы выбрать цвет |  |
| 280 | `color_picker_preview_black` | Preferences | On black | На чёрном |  |
| 281 | `color_picker_preview_card` | Preferences | On a card | На карточке |  |
| 282 | `color_picker_contrast` | Preferences | Contrast %1$s to 1 on a dark card | Контрастность %1$s к 1 на тёмной карточке |  |
| 283 | `color_picker_dark_note` | Preferences | This color is very dark. The app lifts it to a readable tone, so the accent in the app is lighter than this swatch. | Этот цвет очень тёмный. Приложение осветляет его до читаемого тона, поэтому акцентный цвет в приложении светлее этого образца. |  |
| 284 | `preview_setting_microphone` | Preferences | Microphone | Микрофон |  |
| 285 | `preview_setting_equalizer` | Preferences | Equalizer | Эквалайзер |  |
| 286 | `title_background_policy` | Preferences | When you leave the stream | При выходе из стрима |  |
| 287 | `background_policy_disconnect` | Preferences | Disconnect | Отключиться |  |
| 288 | `background_policy_resume` | Preferences | Keep in Recents, resume when reopened | Оставить в недавних, возобновить при возврате |  |
| 289 | `background_policy_pip` | Preferences | Keep streaming in picture-in-picture | Продолжить стрим в режиме «Картинка в картинке» |  |
| 290 | `summary_background_disconnect` | Preferences | Going Home or switching apps ends the stream. Nothing keeps running. | Выход на главный экран или переключение на другое приложение завершает стрим. В фоне ничего не остаётся. |  |
| 291 | `summary_background_resume` | Preferences | Going Home or switching apps ends the stream and leaves its card in Recents. Coming back within 30 minutes (the Recents card or the app icon) reconnects to the same app. The app keeps running on the PC meanwhile, and the device uses no battery for the stream while you are away. | Выход на главный экран или переключение на другое приложение завершает стрим и оставляет его карточку в недавних. При возврате в течение 30 минут (через карточку в недавних или значок приложения) происходит переподключение к тому же приложению. Тем временем приложение продолжает работать на ПК, а устройство не тратит заряд на стрим, пока вас нет. |  |
| 292 | `summary_background_pip` | Preferences | Going Home or switching apps in any way, including One Hand Operation+ gestures, keeps the stream playing in a small window you can watch but not control. Video decoding and the network stay active, so it uses about as much battery as streaming. | Выход на главный экран или любое переключение на другое приложение, включая жесты One Hand Operation+, оставляет стрим в маленьком окне: его можно смотреть, но нельзя им управлять. Декодирование видео и сеть остаются активными, поэтому расход заряда примерно такой же, как при стриме. |  |
| 293 | `title_auto_connect_last` | Preferences | Connect to the last PC on app start | Подключаться к последнему ПК при запуске |  |
| 294 | `summary_auto_connect_last` | Preferences | Opening the app from the launcher starts your last stream right away | При открытии приложения из лаунчера сразу запускается последний стрим |  |
| 295 | `title_gestures` | Preferences | Multi-finger gestures | Жесты несколькими пальцами |  |
| 296 | `summary_gestures` | Preferences | Choose what multi-finger taps, double taps, holds and swipes do. The switch turns them all off, so every touch reaches the touch mode. | Выберите, что делают касания, двойные касания, удержания и свайпы несколькими пальцами. Переключатель отключает их все, и тогда каждое касание обрабатывается режимом сенсора. |  |
| 297 | `gesture_editor_hint` | Preferences | Tap a gesture to choose what it does, and hold one that runs a key or flow to edit that key. Gestures set to Nothing reach the PC like any other touch. Once a swipe or a hold is set for a number of fingers, the app keeps those touches. A double tap waits a moment before a single tap with the same fingers runs. | Нажмите на жест, чтобы выбрать его действие, а чтобы изменить клавишу, удерживайте жест, который запускает клавишу или сценарий. Жесты со значением «Ничего» передаются на ПК как обычное касание. Если для какого-то числа пальцев назначен свайп или удержание, приложение забирает такие касания себе. Двойное касание выжидает момент, прежде чем сработает одиночное касание тем же числом пальцев. |  |
| 298 | `gesture_tap` | Preferences | %1$d-finger tap | Касание %1$d пальцами |  |
| 299 | `gesture_double_tap` | Preferences | %1$d-finger double tap | Двойное касание %1$d пальцами |  |
| 300 | `gesture_hold` | Preferences | %1$d-finger hold | Удержание %1$d пальцами |  |
| 301 | `gesture_section_holds` | Preferences | Holds | Удержания |  |
| 302 | `gesture_hold_duration` | Preferences | Hold for | Удерживать |  |
| 303 | `gesture_hold_seconds` | Preferences | %1$s s | %1$s с |  |
| 304 | `gesture_swipe_up` | Preferences | %1$d-finger swipe up | Свайп вверх %1$d пальцами |  |
| 305 | `gesture_swipe_down` | Preferences | %1$d-finger swipe down | Свайп вниз %1$d пальцами |  |
| 306 | `gesture_swipe_left` | Preferences | %1$d-finger swipe left | Свайп влево %1$d пальцами |  |
| 307 | `gesture_swipe_right` | Preferences | %1$d-finger swipe right | Свайп вправо %1$d пальцами |  |
| 308 | `gesture_section_taps` | Preferences | Taps | Касания |  |
| 309 | `gesture_section_double_taps` | Preferences | Double taps | Двойные касания |  |
| 310 | `gesture_section_swipes` | Preferences | %1$d-finger swipes | Свайпы %1$d пальцами |  |
| 311 | `gesture_group_menu` | Preferences | Menu and mouse | Меню и мышь |  |
| 312 | `gesture_group_actions` | Preferences | Actions | Действия |  |
| 313 | `gesture_group_keys` | Preferences | Keys | Клавиши |  |
| 314 | `gesture_multitouch_title` | Preferences | Gestures in multi-touch mode | Жесты в режиме мультитач |  |
| 315 | `gesture_multitouch_summary` | Preferences | With the multi-touch touchscreen mode, read these gestures instead of sending every touch to the PC. The other touch modes always read them. | В режиме сенсора «Мультитач» распознавать эти жесты, а не передавать каждое касание на ПК. Остальные режимы сенсора распознают их всегда. |  |
| 316 | `gesture_windows_preset` | Preferences | Use Windows touchpad swipes | Использовать свайпы тачпада Windows |  |
| 317 | `gesture_windows_preset_summary` | Preferences | 3 fingers: up for Task View, down for the desktop, sideways to switch apps. 4 fingers sideways: switch desktops. | 3 пальца: вверх — представление задач, вниз — рабочий стол, в стороны — переключение приложений. 4 пальца в стороны: переключение рабочих столов. |  |
| 318 | `gesture_windows_preset_applied` | Preferences | Windows swipes set | Свайпы Windows назначены |  |
| 319 | `gesture_action_none` | Preferences | Nothing (send to the PC) | Ничего (передать на ПК) |  |
| 320 | `gesture_action_quick_menu` | Preferences | Open Quick Menu | Открыть быстрое меню |  |
| 321 | `gesture_action_middle_click` | Preferences | Middle mouse click | Щелчок средней кнопкой мыши |  |
| 322 | `gesture_action_missing_key` | Preferences | Deleted custom key (does nothing) | Удалённая пользовательская клавиша (ничего не делает) |  |
| 323 | `game_menu_style_list` | Preferences | List | Список |  |
| 324 | `game_menu_style_grid` | Preferences | Grid with icons | Сетка со значками |  |
| 325 | `game_menu_segment_grid` | Preferences | Grid | Сетка |  |
| 326 | `game_menu_style_compact` | Preferences | Compact | Компактный |  |
| 327 | `title_customize_game_menu` | Preferences | In-stream menu | Меню во время стрима |  |
| 328 | `summary_customize_game_menu` | Preferences | Pick the menu style and which actions the Quick Menu shows, with a live preview | Выберите стиль меню и действия, которые показывает быстрое меню, с предпросмотром в реальном времени |  |
| 329 | `game_menu_customize` | Preferences | Customize menu | Настроить меню |  |
| 330 | `game_menu_editor_hint` | Preferences | Switched on actions appear in the Quick Menu in this order. Drag the handle or long press a row to reorder. Switched off actions stay under Advanced Menu, and the eye hides one from there too. Disconnect and Quit always stay in the Session section. | Включённые действия показываются в быстром меню в этом порядке. Чтобы изменить порядок, перетащите маркер или удерживайте строку. Выключенные действия остаются в расширенном меню, а значок глаза скрывает действие и оттуда. «Отключиться» и «Завершить сессию» всегда остаются в разделе «Сессия». |  |
| 331 | `game_menu_editor_style` | Preferences | Menu style | Стиль меню |  |
| 332 | `game_menu_editor_preview` | Preferences | Preview | Предпросмотр | ⚠ long (7→12 chars) — check layout |
| 333 | `game_menu_section_actions` | Preferences | Actions | Действия |  |
| 334 | `game_menu_section_session` | Preferences | Session | Сессия |  |
| 335 | `game_menu_section_menu` | Preferences | Menu | Меню |  |
| 336 | `game_menu_section_controller` | Preferences | Controller | Контроллер |  |
| 337 | `game_menu_section_keys` | Preferences | Keys | Клавиши |  |
| 338 | `conn_terminated_reconnect` | Preferences | Reconnect | Переподключиться | ⚠ long (9→16 chars) — check layout |
| 339 | `home_title` | Preferences | Super Artemis | Super Artemis |  |
| 340 | `home_help` | Preferences | Help | Помощь |  |
| 341 | `home_settings` | Preferences | Settings | Настройки |  |
| 342 | `home_add_pc` | Preferences | Add a PC | Добавить ПК |  |
| 343 | `title_keyboard_service` | Preferences | System key capture | Перехват системных клавиш |  |
| 344 | `summary_keyboard_service_on` | Preferences | On. Alt+Tab, the Windows key and other system shortcuts of a physical keyboard reach the PC. | Вкл. Alt+Tab, клавиша Windows и другие системные сочетания физической клавиатуры доходят до ПК. |  |
| 345 | `summary_keyboard_service_off` | Preferences | Off. Android keeps Alt+Tab, the Windows key and some other shortcuts of a physical keyboard. Tap to turn on the Super Artemis keyboard service in Accessibility. | Выкл. Android оставляет себе Alt+Tab, клавишу Windows и некоторые другие сочетания физической клавиатуры. Нажмите, чтобы включить службу клавиатуры Super Artemis в разделе «Специальные возможности». |  |
| 346 | `title_landscape_side` | Preferences | Landscape side | Сторона альбомной ориентации | ⚠ long (14→28 chars) — check layout |
| 347 | `landscape_side_follow` | Preferences | Follow the sensor | По датчику |  |
| 348 | `landscape_side_normal` | Preferences | Normal | Обычная |  |
| 349 | `landscape_side_reverse` | Preferences | Upside down | Перевёрнутая |  |
| 350 | `stream_starting_video` | Preferences | Starting video… | Запуск видео… |  |
| 351 | `pip_closed_title` | Preferences | Stream closed | Стрим закрыт |  |
| 352 | `pip_closed_message` | Preferences | The picture-in-picture window of %1$s on %2$s was closed. Reconnect to it? | Окно «картинка в картинке» для %1$s на %2$s закрыто. Подключиться снова? |  |
| 353 | `pip_closed_not_now` | Preferences | Not now | Не сейчас |  |
| 354 | `profile_scope_app_wide` | Preferences | Same for all profiles. Change it in Settings. | Одинаково для всех профилей. Изменить можно в настройках. |  |
| 355 | `profile_scope_edit_when_active` | Preferences | Saved per profile. Edit it from the Quick Menu while this profile is active. | Сохраняется для каждого профиля отдельно. Изменить можно из быстрого меню, пока этот профиль активен. |  |
| 356 | `game_menu_back_to_quick_menu` | Preferences | Back to Quick Menu | Назад в быстрое меню |  |
| 357 | `title_custom_keys` | Preferences | Special keys | Спец-клавиши |  |
| 358 | `summary_custom_keys` | Preferences | Hide, reorder and give icons to the built-in keys, and record your own keys and flows | Скрывайте встроенные клавиши, меняйте их порядок и значки, записывайте свои клавиши и сценарии |  |
| 359 | `custom_keys_title` | Preferences | Special keys | Спец-клавиши |  |
| 360 | `custom_keys_empty` | Preferences | No custom keys yet. Tap Add key to record one. | Пользовательских клавиш пока нет. Нажмите «Добавить клавишу», чтобы записать её. |  |
| 361 | `custom_keys_done` | Preferences | Done | Готово |  |
| 362 | `custom_keys_unreadable` | Preferences | Your custom keys could not be read, so they cannot be edited here. Import a valid file from Settings, or start over with an empty list. | Не удалось прочитать ваши пользовательские клавиши, поэтому их нельзя изменить здесь. Импортируйте корректный файл в настройках или начните заново с пустого списка. |  |
| 363 | `custom_keys_start_over` | Preferences | Start over | Начать заново |  |
| 364 | `custom_key_add` | Preferences | Add key or flow | Добавить клавишу или сценарий | ⚠ long (15→29 chars) — check layout |
| 365 | `custom_key_add_title` | Preferences | New key or flow | Новая клавиша или сценарий | ⚠ long (15→26 chars) — check layout |
| 366 | `custom_key_edit_title` | Preferences | Edit key or flow | Изменить клавишу или сценарий | ⚠ long (16→29 chars) — check layout |
| 367 | `custom_key_name_hint` | Preferences | Name | Название |  |
| 368 | `custom_key_keys_label` | Preferences | Keys, pressed in this order | Клавиши, нажимаемые в этом порядке |  |
| 369 | `custom_key_steps_label` | Preferences | Steps, run one after another | Шаги, выполняемые один за другим |  |
| 370 | `custom_key_steps_empty` | Preferences | Add a step below. A single Keys step is a normal shortcut. | Добавьте шаг ниже. Один шаг «Клавиши» — это обычное сочетание клавиш. |  |
| 371 | `custom_key_add_step` | Preferences | Add step | Добавить шаг |  |
| 372 | `custom_key_record_title_combo` | Preferences | Record the keys for this step | Запишите клавиши для этого шага |  |
| 373 | `custom_key_record_title_single` | Preferences | Record one key to hold or release | Запишите одну клавишу, которую нужно удержать или отпустить |  |
| 374 | `custom_key_record_done` | Preferences | Done | Готово |  |
| 375 | `custom_key_step_edit` | Preferences | Edit step | Изменить шаг |  |
| 376 | `custom_key_step_delete` | Preferences | Delete step | Удалить шаг |  |
| 377 | `custom_key_step_move_up` | Preferences | Move up | Переместить вверх | ⚠ long (7→17 chars) — check layout |
| 378 | `custom_key_step_move_down` | Preferences | Move down | Переместить вниз | ⚠ long (9→16 chars) — check layout |
| 379 | `step_type_combo` | Preferences | Keys | Клавиши |  |
| 380 | `step_type_text` | Preferences | Type text | Ввести текст |  |
| 381 | `step_type_wait` | Preferences | Wait | Ожидание |  |
| 382 | `step_type_hold` | Preferences | Hold key | Удержать клавишу | ⚠ long (8→16 chars) — check layout |
| 383 | `step_type_release` | Preferences | Release key | Отпустить клавишу |  |
| 384 | `step_type_repeat` | Preferences | Repeat | Повтор |  |
| 385 | `step_type_action` | Preferences | App action | Действие приложения | ⚠ long (10→19 chars) — check layout |
| 386 | `step_desc_text` | Preferences | Type \"%1$s\" | Ввести «%1$s» |  |
| 387 | `step_desc_wait` | Preferences | Wait %1$d ms | Ждать %1$d мс |  |
| 388 | `step_desc_hold` | Preferences | Hold %1$s | Удержать %1$s |  |
| 389 | `step_desc_release` | Preferences | Release %1$s | Отпустить %1$s |  |
| 390 | `step_desc_repeat` | Preferences | Repeat the previous step %1$d more times | Повторить предыдущий шаг, ещё повторов: %1$d |  |
| 391 | `step_desc_action` | Preferences | Run %1$s | Выполнить: %1$s | ⚠ long (8→15 chars) — check layout |
| 392 | `step_text_hint` | Preferences | Text to type on the PC | Текст для ввода на ПК |  |
| 393 | `step_wait_hint` | Preferences | Milliseconds (10 to 60000) | Миллисекунды (от 10 до 60000) |  |
| 394 | `step_repeat_hint` | Preferences | How many more times (1 to 50) | Сколько ещё раз (от 1 до 50) |  |
| 395 | `step_action_title` | Preferences | Choose an action | Выберите действие |  |
| 396 | `flow_busy` | Preferences | Another special key is still running | Другая спец-клавиша ещё выполняется |  |
| 397 | `custom_key_sticky_flow` | Preferences | Sticky works only for a key that is one shortcut | Залипание работает только для клавиши из одного сочетания |  |
| 398 | `custom_key_combo_hint` | Preferences | Tap keys below. For a physical keyboard, tap here first. | Нажимайте клавиши ниже. Для физической клавиатуры сначала нажмите здесь. |  |
| 399 | `custom_key_remove_last` | Preferences | Remove last key | Удалить последнюю клавишу | ⚠ long (15→25 chars) — check layout |
| 400 | `custom_key_sticky` | Preferences | Sticky: stays pressed until tapped again (on-screen key layer) | Залипающая: остаётся нажатой до повторного нажатия (слой экранных клавиш) |  |
| 401 | `custom_key_icon_label` | Preferences | Icon (tap again to clear) | Значок (нажмите ещё раз, чтобы убрать) |  |
| 402 | `recorder_section_function` | Preferences | Function keys | Функциональные клавиши | ⚠ long (13→22 chars) — check layout |
| 403 | `recorder_section_typing` | Preferences | Typing | Набор текста | ⚠ long (6→12 chars) — check layout |
| 404 | `recorder_section_symbols` | Preferences | Symbols | Символы |  |
| 405 | `recorder_section_navigation` | Preferences | Navigation | Навигация |  |
| 406 | `recorder_high_function_hint` | Preferences | Free keys no physical keyboard has, ready for PC hotkeys in AHK, OBS or Discord. For an action in this app, use App action or a flow. | Свободные клавиши, которых нет ни на одной физической клавиатуре, — для горячих клавиш на ПК в AHK, OBS или Discord. Для действия в этом приложении используйте «Действие приложения» или сценарий. |  |
| 407 | `custom_key_hotkey_label` | Preferences | Hotkey on a connected keyboard | Горячая клавиша на подключённой клавиатуре |  |
| 408 | `custom_key_hotkey_none` | Preferences | None | Нет |  |
| 409 | `custom_key_hotkey_set` | Preferences | Set | Задать |  |
| 410 | `custom_key_hotkey_clear` | Preferences | Clear | Очистить |  |
| 411 | `custom_key_hotkey_hint` | Preferences | During a stream, this combo on a keyboard connected to the phone runs the key instead of reaching the PC. | Во время стрима это сочетание на клавиатуре, подключённой к телефону, запускает клавишу и не передаётся на ПК. |  |
| 412 | `custom_key_hotkey_to_pc` | Preferences | Also send the hotkey to the PC | Также отправлять горячую клавишу на ПК |  |
| 413 | `custom_key_hotkey_press_title` | Preferences | Press the hotkey | Нажмите горячую клавишу |  |
| 414 | `custom_key_hotkey_press_message` | Preferences | Hold Ctrl, Alt, Shift or Win and press a key on the keyboard connected to this phone. Ctrl + Alt + a number or F13 to F24 avoid clashes with PC shortcuts. | Удерживая Ctrl, Alt, Shift или Win, нажмите клавишу на клавиатуре, подключённой к этому телефону. Ctrl + Alt + цифра или клавиши от F13 до F24 не конфликтуют с сочетаниями клавиш на ПК. |  |
| 415 | `custom_key_hotkey_common` | Preferences | The PC uses this shortcut too. While it is bound here, the PC no longer gets it unless "Also send the hotkey to the PC" is on. | ПК тоже использует это сочетание. Пока оно назначено здесь, ПК его не получает, если не включено «Также отправлять горячую клавишу на ПК». |  |
| 416 | `custom_key_hotkey_taken` | Preferences | %1$s already uses this hotkey. Pick another one or clear it there first. | %1$s уже использует эту горячую клавишу. Выберите другую или сначала очистите её там. |  |
| 417 | `custom_key_delete` | Preferences | Delete | Удалить |  |
| 418 | `custom_key_delete_confirm` | Preferences | Delete \"%1$s\"? | Удалить «%1$s»? |  |
| 419 | `game_menu_add_custom_key` | Preferences | Add key or flow | Добавить клавишу или сценарий | ⚠ long (15→29 chars) — check layout |
| 420 | `game_menu_manage_custom_keys` | Preferences | Manage special keys | Управление спец-клавишами |  |
| 421 | `game_menu_customize_quick_bar` | Preferences | Customize quick-action bar | Настроить панель быстрых действий |  |
| 422 | `title_quick_bar` | Preferences | Quick-action bars | Панели быстрых действий |  |
| 423 | `summary_quick_bar` | Preferences | Pin actions and keys as small buttons anywhere on screen, in rows or columns and switchable sets | Закрепляйте действия и клавиши маленькими кнопками в любом месте экрана — строками или столбцами, в переключаемых наборах |  |
| 424 | `quick_bar_editor_hint` | Preferences | Buttons fill the grid row by row from the corner of its position. Green buttons are switched on, a long press on a button opens its bar menu, and bars fade after a few seconds. Disconnect and Quit are left out, so a stray tap cannot end the stream. | Кнопки заполняют сетку строка за строкой, начиная от угла её позиции. Зелёные кнопки включены, удержание кнопки открывает меню её панели, а панели тускнеют через несколько секунд. «Отключиться» и «Завершить сессию» сюда не входят, чтобы случайное касание не завершило стрим. |  |
| 425 | `quick_bar_set_label` | Preferences | Set | Набор |  |
| 426 | `quick_bar_set_options` | Preferences | Set options | Параметры набора |  |
| 427 | `quick_bar_set_active` | Preferences | %1$s (active) | %1$s (активный) |  |
| 428 | `quick_bar_set_new` | Preferences | New set | Новый набор |  |
| 429 | `quick_bar_set_rename` | Preferences | Rename set | Переименовать набор | ⚠ long (10→19 chars) — check layout |
| 430 | `quick_bar_set_duplicate` | Preferences | Duplicate set | Дублировать набор |  |
| 431 | `quick_bar_set_delete` | Preferences | Delete set | Удалить набор |  |
| 432 | `quick_bar_set_default_name` | Preferences | Set %1$d | Набор %1$d |  |
| 433 | `quick_bar_set_copy_name` | Preferences | %1$s copy | %1$s (копия) |  |
| 434 | `quick_bar_copy_bar` | Preferences | Copy this bar to another set | Копировать эту панель в другой набор |  |
| 435 | `quick_bar_bar_copied` | Preferences | Bar copied to %1$s | Панель скопирована в набор «%1$s» | ⚠ long (18→33 chars) — check layout |
| 436 | `quick_bar_switch_set` | Preferences | Switch quick-action set | Сменить набор быстрых действий |  |
| 437 | `quick_bar_anchor` | Preferences | Position | Позиция |  |
| 438 | `quick_bar_anchor_top_left` | Preferences | Top left | Вверху слева |  |
| 439 | `quick_bar_anchor_top_center` | Preferences | Top | Вверху |  |
| 440 | `quick_bar_anchor_top_right` | Preferences | Top right | Вверху справа |  |
| 441 | `quick_bar_anchor_center_left` | Preferences | Left | Слева |  |
| 442 | `quick_bar_anchor_center` | Preferences | Center | По центру |  |
| 443 | `quick_bar_anchor_center_right` | Preferences | Right | Справа |  |
| 444 | `quick_bar_anchor_bottom_left` | Preferences | Bottom left | Внизу слева |  |
| 445 | `quick_bar_anchor_bottom_center` | Preferences | Bottom | Внизу |  |
| 446 | `quick_bar_anchor_bottom_right` | Preferences | Bottom right | Внизу справа |  |
| 447 | `quick_bar_per_line` | Preferences | Buttons per line: %1$d (more buttons start a new line) | Кнопок в ряду: %1$d (лишние начинают новый ряд) |  |
| 448 | `quick_bar_fill` | Preferences | Fill | Заполнение | ⚠ long (4→10 chars) — check layout |
| 449 | `quick_bar_fill_across` | Preferences | Across (rows) | Строками |  |
| 450 | `quick_bar_fill_down` | Preferences | Down (columns) | Столбцами |  |
| 451 | `quick_bar_offset_x` | Preferences | Move sideways: %1$d dp | Сдвиг вбок: %1$d dp |  |
| 452 | `quick_bar_offset_y` | Preferences | Move up or down: %1$d dp | Сдвиг вверх или вниз: %1$d dp |  |
| 453 | `quick_bar_reset_offset` | Preferences | Reset position | Сбросить позицию |  |
| 454 | `quick_bar_remove_bar` | Preferences | Remove bar | Убрать панель |  |
| 455 | `quick_bar_add_bar` | Preferences | Add bar | Добавить панель | ⚠ long (7→15 chars) — check layout |
| 456 | `quick_bar_bar_items` | Preferences | Buttons on the %1$s bar | Кнопки на панели «%1$s» |  |
| 457 | `quick_bar_no_bars` | Preferences | No bars in this set yet. Add one below. | В этом наборе пока нет панелей. Добавьте панель ниже. |  |
| 458 | `title_quick_bar_profile` | Preferences | Quick-action bars: %1$s | Панели быстрых действий: %1$s |  |
| 459 | `profile_manager_copy` | Preferences | Copy profile | Копировать профиль |  |
| 460 | `profile_manager_title` | Preferences | Profiles | Профили |  |
| 461 | `profile_manager_back` | Preferences | Back | Назад |  |
| 462 | `profile_manager_set_active` | Preferences | Use this profile | Использовать этот профиль |  |
| 463 | `profile_manager_edit` | Preferences | Edit profile | Редактировать профиль | ⚠ long (12→21 chars) — check layout |
| 464 | `profile_manager_duplicate` | Preferences | Duplicate | Дублировать |  |
| 465 | `profile_manager_copy_name` | Preferences | %1$s copy | %1$s (копия) |  |
| 466 | `profile_manager_duplicated` | Preferences | Created %1$s | Создан профиль «%1$s» | ⚠ long (12→21 chars) — check layout |
| 467 | `profile_manager_copy_into` | Preferences | Copy settings into another profile | Копировать настройки в другой профиль |  |
| 468 | `profile_manager_copy_into_title` | Preferences | Copy %1$s into | Куда скопировать «%1$s» | ⚠ long (14→23 chars) — check layout |
| 469 | `profile_manager_copy_into_confirm` | Preferences | Every setting of %2$s, including its quick-action bar sets, is replaced with the settings of %1$s. The name of %2$s stays. | Все настройки профиля «%2$s», включая его наборы панелей быстрых действий, будут заменены настройками профиля «%1$s». Имя профиля «%2$s» сохранится. |  |
| 470 | `profile_manager_copy_into_action` | Preferences | Replace | Заменить |  |
| 471 | `profile_manager_copied_into` | Preferences | Settings copied into %1$s | Настройки скопированы в профиль «%1$s» |  |
| 472 | `quick_bar_menu_title` | Preferences | %1$s (%2$s bar) | %1$s (панель: %2$s) |  |
| 473 | `quick_bar_menu_add_key` | Preferences | Add key or flow here | Добавить сюда клавишу или сценарий | ⚠ long (20→34 chars) — check layout |
| 474 | `quick_bar_menu_pin_key` | Preferences | Pin a special key here | Закрепить здесь спец-клавишу |  |
| 475 | `quick_bar_menu_edit_bar` | Preferences | Edit this bar | Изменить эту панель |  |
| 476 | `quick_bar_custom_key` | Preferences | Key: %1$s | Клавиша: %1$s |  |
| 477 | `quick_bar_custom_flow` | Preferences | Flow: %1$s | Сценарий: %1$s |  |
| 478 | `quick_bar_menu_edit_key` | Preferences | Edit this key or flow | Изменить эту клавишу или сценарий |  |
| 479 | `quick_bar_menu_change_icon` | Preferences | Change icon | Сменить значок |  |
| 480 | `icon_group_general` | Preferences | General | Общие |  |
| 481 | `icon_group_voice` | Preferences | Mic and voice | Микрофон и голос |  |
| 482 | `icon_group_media` | Preferences | Media and sound | Медиа и звук |  |
| 483 | `icon_group_window` | Preferences | Windows and layout | Окна и расположение |  |
| 484 | `icon_group_keys` | Preferences | Keys and arrows | Клавиши и стрелки |  |
| 485 | `icon_group_edit` | Preferences | Edit and files | Правка и файлы |  |
| 486 | `icon_group_system` | Preferences | System and power | Система и питание |  |
| 487 | `icon_group_security` | Preferences | Security | Безопасность |  |
| 488 | `icon_group_web` | Preferences | Web and sharing | Интернет и обмен |  |
| 489 | `icon_group_capture` | Preferences | Capture | Захват |  |
| 490 | `icon_group_input` | Preferences | Input and games | Ввод и игры |  |
| 491 | `icon_search_hint` | Preferences | Search icons | Поиск значков |  |
| 492 | `icon_search_empty` | Preferences | No icon matches | Подходящих значков нет |  |
| 493 | `quick_bar_fit_ok` | Preferences | Fits %1$d per line on this screen | На этом экране в строку помещается %1$d |  |
| 494 | `quick_bar_fit_over` | Preferences | This screen fits %1$d per line, so this bar starts a new line there. A wider screen shows %2$d. | На этом экране в строку помещается %1$d, поэтому здесь панель переносится на новую строку. На более широком экране в строке будет %2$d. |  |
| 495 | `quick_bar_fit_preset` | Preferences | %1$d | %1$d |  |
| 496 | `quick_bar_fit_best` | Preferences | Fit screen | По размеру экрана | ⚠ long (10→17 chars) — check layout |
| 497 | `key_row_edit` | Preferences | Edit this key or flow | Изменить эту клавишу или сценарий |  |
| 498 | `key_edit_failed` | Preferences | This key could not be edited | Не удалось изменить эту клавишу |  |
| 499 | `game_menu_editor_save` | Preferences | Save | Сохранить | ⚠ long (4→9 chars) — check layout |
| 500 | `game_menu_editor_reset` | Preferences | Reset | Сбросить |  |
| 501 | `game_menu_editor_drag` | Preferences | Drag to reorder | Перетащите, чтобы изменить порядок | ⚠ long (15→34 chars) — check layout |
| 502 | `game_menu_item_zoom` | Preferences | Pan/Zoom | Прокрутка/масш. | ⚠ long (8→15 chars) — check layout |
| 503 | `game_menu_item_microphone` | Preferences | Mute or unmute microphone | Выключить или включить микрофон |  |
| 504 | `game_menu_send_keys_win` | In Game menu | Win (Meta) | Win (Meta) | ⚠ identical to English |
| 505 | `game_menu_send_keys_win_g` | In Game menu | Win + G (Xbox Game Bar) | Win + G (Xbox Game Bar) | ⚠ identical to English |
| 506 | `perf_overlay_lite_netdrops` | In Game menu | %1$.2f%% | %1$.2f%% |  |
| 507 | `perf_overlay_lite_streamdetails` | In Game menu | %1$s | %1$s |  |
| 508 | `perf_overlay_lite_fps` | In Game menu | %1$.2f | %1$.2f |  |
| 509 | `perf_overlay_drawn_fps` | In Game menu | GpuFPS: | GpuFPS: | ⚠ identical to English |
| 510 | `perf_overlay_ai_fps` | In Game menu | 3DFPS: | 3DFPS: | ⚠ identical to English |
| 511 | `summary_software_update` | In Game menu | Super Artemis by Arora-Sir, based on Artemis by ClassicOldSong. Visit GitHub Releases to get the latest version. | Super Artemis от Arora-Sir на основе Artemis от ClassicOldSong. Последнюю версию можно получить на странице GitHub Releases. |  |
| 512 | `title_share_diagnostics` | In Game menu | Share diagnostic log | Поделиться журналом диагностики |  |
| 513 | `summary_share_diagnostics` | In Game menu | Send the app log and the last crash report through any app, to attach to a bug report. | Отправить журнал приложения и последний отчёт о сбое через любое приложение, чтобы приложить их к сообщению об ошибке. |  |
| 514 | `keywords_diagnostics` | In Game menu | log, logs, logcat, crash, bug, report, error, diagnostics | журнал, лог, логи, logcat, сбой, вылет, баг, ошибка, отчёт, сообщить, диагностика, log, crash |  |
| 515 | `crash_title` | In Game menu | Super Artemis closed unexpectedly | Super Artemis неожиданно завершил работу |  |
| 516 | `crash_message` | In Game menu | A report of what went wrong was saved on this device. Sharing it with a bug report helps fix the problem. | На этом устройстве сохранён отчёт о том, что пошло не так. Если приложить его к сообщению об ошибке, это поможет исправить проблему. |  |
| 517 | `crash_share` | In Game menu | Share report | Поделиться отчётом |  |
| 518 | `crash_send` | In Game menu | Send report | Отправить отчёт |  |
| 519 | `crash_send_title` | In Game menu | Send the log | Отправка журнала |  |
| 520 | `crash_send_message` | In Game menu | Pick where the log goes. It holds the app and Android versions, the device model and the app\'s own log lines. | Выберите, куда отправить журнал. В нём есть версии приложения и Android, модель устройства и собственные записи журнала приложения. |  |
| 521 | `crash_option_new_issue` | In Game menu | Open a new bug report | Создать новый отчёт об ошибке |  |
| 522 | `crash_option_new_issue_summary` | In Game menu | Opens the form on GitHub with your device filled in. The log is copied, paste it in Relevant log output. | Открывает форму на GitHub с уже заполненными данными вашего устройства. Журнал скопирован — вставьте его в поле «Relevant log output». |  |
| 523 | `crash_option_existing_issue` | In Game menu | Add to an existing issue | Дополнить существующий отчёт |  |
| 524 | `crash_option_existing_issue_summary` | In Game menu | Opens the issue list. The log is copied, paste it in a comment. | Открывает список отчётов. Журнал скопирован — вставьте его в комментарий. |  |
| 525 | `crash_option_save` | In Game menu | Save to Downloads | Сохранить в «Загрузки» |  |
| 526 | `crash_option_save_summary` | In Game menu | A text file you can attach later | Текстовый файл, который можно приложить позже |  |
| 527 | `crash_option_share` | In Game menu | Share with an app | Поделиться через приложение |  |
| 528 | `crash_option_share_summary` | In Game menu | Mail, chat or Quick Share | Почта, мессенджер или Quick Share |  |
| 529 | `crash_option_copy` | In Game menu | Copy to clipboard | Копировать в буфер обмена |  |
| 530 | `crash_option_copy_summary` | In Game menu | Paste it anywhere | Вставьте его куда угодно |  |
| 531 | `crash_copied` | In Game menu | Log copied | Журнал скопирован | ⚠ long (10→17 chars) — check layout |
| 532 | `crash_saved` | In Game menu | Saved to Downloads as %1$s | Сохранено в «Загрузки» как %1$s |  |
| 533 | `crash_report_github` | In Game menu | Report on GitHub | Сообщить на GitHub |  |
| 534 | `crash_dismiss` | In Game menu | Not now | Не сейчас |  |
| 535 | `crash_share_subject` | In Game menu | Super Artemis diagnostic log | Журнал диагностики Super Artemis |  |
| 536 | `crash_share_failed` | In Game menu | Could not share the log | Не удалось поделиться журналом |  |
| 537 | `safe_run_failed` | In Game menu | That did not work. It was saved to the diagnostic log in Settings > More. | Не получилось. Ошибка записана в журнал диагностики в разделе Настройки > Разное. |  |
| 538 | `title_checkbox_right_alt_as_meta` | In Game menu | Right Alt as Command (Mac) | Правый Alt как Command (Mac) |  |
| 539 | `summary_right_alt_as_meta` | In Game menu | Remap Right Alt to the Command key for Mac streaming. Any Right Alt+key combo becomes Command+key. Left Alt is unaffected. | Переназначает правый Alt на клавишу Command для стриминга на Mac. Любое сочетание правый Alt+клавиша становится Command+клавиша. Левый Alt не затрагивается. |  |
| 540 | `render_mode_3d_sbs` | In Game menu | AI SBS 3D | AI SBS 3D | ⚠ identical to English |
| 541 | `debug_info_vid_pid` | In Game menu | VID_PID:  | VID_PID:  | ⚠ identical to English |
| 542 | `vdisplay_not_supported` | In Game menu | <![CDATA[Virtual display isn\'t supported on this server. Please use <a href=\"https://github.com/ClassicOldSong/Apollo\">Apollo</a> as the host streaming software.]]> | <![CDATA[Этот сервер не поддерживает виртуальный дисплей. Используйте <a href=\"https://github.com/ClassicOldSong/Apollo\">Apollo</a> в качестве ПО для стриминга на хосте.]]> |  |
| 543 | `special_keys_more` | More keys: everyday Windows shortcuts | More keys | Ещё клавиши |  |
| 544 | `key_picker_add` | More keys: everyday Windows shortcuts | Add key or flow | Добавить клавишу или сценарий | ⚠ long (15→29 chars) — check layout |
| 545 | `game_menu_settings` | More keys: everyday Windows shortcuts | Settings | Настройки |  |
| 546 | `toast_settings_resume` | More keys: everyday Windows shortcuts | The stream reconnects when you close Settings | Стрим переподключится, когда вы закроете настройки |  |
| 547 | `game_menu_editor_hide_from_advanced` | More keys: everyday Windows shortcuts | Hide from Advanced Menu | Скрыть из расширенного меню |  |
| 548 | `game_menu_editor_show_in_advanced` | More keys: everyday Windows shortcuts | Show in Advanced Menu | Показывать в расширенном меню |  |
| 549 | `more_key_ctrl_a` | More keys: everyday Windows shortcuts | Ctrl + A (Select all) | Ctrl + A (Выделить всё) |  |
| 550 | `more_key_ctrl_c` | More keys: everyday Windows shortcuts | Ctrl + C (Copy) | Ctrl + C (Копировать) |  |
| 551 | `more_key_ctrl_x` | More keys: everyday Windows shortcuts | Ctrl + X (Cut) | Ctrl + X (Вырезать) |  |
| 552 | `more_key_ctrl_z` | More keys: everyday Windows shortcuts | Ctrl + Z (Undo) | Ctrl + Z (Отменить) |  |
| 553 | `more_key_ctrl_y` | More keys: everyday Windows shortcuts | Ctrl + Y (Redo) | Ctrl + Y (Повторить) |  |
| 554 | `more_key_ctrl_s` | More keys: everyday Windows shortcuts | Ctrl + S (Save) | Ctrl + S (Сохранить) |  |
| 555 | `more_key_ctrl_f` | More keys: everyday Windows shortcuts | Ctrl + F (Find) | Ctrl + F (Найти) |  |
| 556 | `more_key_win_v` | More keys: everyday Windows shortcuts | Win + V (Clipboard history) | Win + V (Журнал буфера обмена) |  |
| 557 | `more_key_win_shift_s` | More keys: everyday Windows shortcuts | Win + Shift + S (Snip) | Win + Shift + S (Ножницы) |  |
| 558 | `more_key_ctrl_shift_esc` | More keys: everyday Windows shortcuts | Ctrl + Shift + Esc (Task Manager) | Ctrl + Shift + Esc (Диспетчер задач) |  |
| 559 | `more_key_ctrl_w` | More keys: everyday Windows shortcuts | Ctrl + W (Close tab) | Ctrl + W (Закрыть вкладку) |  |
| 560 | `more_key_ctrl_t` | More keys: everyday Windows shortcuts | Ctrl + T (New tab) | Ctrl + T (Новая вкладка) |  |
| 561 | `more_key_ctrl_shift_t` | More keys: everyday Windows shortcuts | Ctrl + Shift + T (Reopen tab) | Ctrl + Shift + T (Открыть закрытую вкладку) |  |
| 562 | `more_key_win_e` | More keys: everyday Windows shortcuts | Win + E (File Explorer) | Win + E (Проводник) |  |
| 563 | `more_key_win_l` | More keys: everyday Windows shortcuts | Win + L (Lock) | Win + L (Блокировка) |  |
| 564 | `more_key_win_r` | More keys: everyday Windows shortcuts | Win + R (Run) | Win + R (Выполнить) |  |
| 565 | `title_lock_help` | More keys: everyday Windows shortcuts | Lock key does nothing? | Клавиша блокировки не работает? |  |
| 566 | `summary_lock_help` | More keys: everyday Windows shortcuts | Windows ignores Win+L from a stream. Two ways to fix it, with or without a script | Windows игнорирует Win+L из стрима. Два способа это исправить — со скриптом или без него |  |
| 567 | `keywords_lock_help` | More keys: everyday Windows shortcuts | lock, win l, windows l, lock screen, lock pc, autohotkey, super artemis lock key | блокировка, заблокировать, win l, windows l, экран блокировки, заблокировать пк, autohotkey, клавиша блокировки super artemis, lock |  |
| 568 | `lock_help_intro` | More keys: everyday Windows shortcuts | Windows ignores a Win+L that comes from a remote session | Windows игнорирует Win+L, пришедшее из удалённой сессии |  |
| 569 | `lock_help_why` | More keys: everyday Windows shortcuts | The Lock key sends the right keys, but Windows refuses to lock for keys that come from a stream. Pick the way that fits your PC. | Клавиша блокировки отправляет правильные клавиши, но Windows отказывается блокироваться по клавишам, пришедшим из стрима. Выберите способ, который подходит вашему ПК. |  |
| 570 | `lock_help_apollo_title` | More keys: everyday Windows shortcuts | Option 1: Apollo, nothing to install | Вариант 1: Apollo, ничего устанавливать не нужно |  |
| 571 | `lock_help_apollo_steps` | More keys: everyday Windows shortcuts | 1. On the PC, open the Apollo web page and go to Configuration, then General.\n2. Under Server commands, add a command named Lock with the line below, and leave Run as administrator off.\n3. Save, and restart Apollo if the page asks. | 1. На ПК откройте веб-страницу Apollo и перейдите в «Настройки», затем «Общие».\n2. В разделе «Команды сервера» добавьте команду с названием Lock и строкой ниже, а «Права администратора» оставьте выключенными.\n3. Сохраните и перезапустите Apollo, если страница попросит. |  |
| 572 | `lock_help_apollo_after` | More keys: everyday Windows shortcuts | From then on the Lock key runs that command by itself. The app finds it by the word Lock in the name. | С этого момента клавиша блокировки сама запускает эту команду. Приложение находит её по слову Lock в названии. |  |
| 573 | `lock_help_ahk_title` | More keys: everyday Windows shortcuts | Option 2: Any host, with AutoHotkey | Вариант 2: любой хост, с AutoHotkey |  |
| 574 | `lock_help_ahk_steps` | More keys: everyday Windows shortcuts | 1. Install AutoHotkey v2 on the PC from autohotkey.com.\n2. Save the lines below in a file named Lock.ahk and double-click it.\n3. Press Win+R, type shell:startup and put the file there, so it runs after every restart. | 1. Установите на ПК AutoHotkey v2 с сайта autohotkey.com.\n2. Сохраните строки ниже в файл с именем Lock.ahk и запустите его двойным щелчком.\n3. Нажмите Win+R, введите shell:startup и переместите туда файл, чтобы он запускался после каждой перезагрузки. |  |
| 575 | `lock_help_ahk_after` | More keys: everyday Windows shortcuts | The script catches the Win+L that the Lock key sends and locks the PC. | Скрипт перехватывает Win+L, которое отправляет клавиша блокировки, и блокирует ПК. |  |
| 576 | `lock_help_keyboard` | More keys: everyday Windows shortcuts | A real keyboard on the PC keeps working as before. The Full guide button opens these steps with more detail. | Настоящая клавиатура ПК работает как прежде. Кнопка «Полная инструкция» открывает эти шаги с подробностями. |  |
| 577 | `lock_help_copy` | More keys: everyday Windows shortcuts | Copy | Копировать | ⚠ long (4→10 chars) — check layout |
| 578 | `lock_help_copied` | More keys: everyday Windows shortcuts | Copied | Скопировано | ⚠ long (6→11 chars) — check layout |
| 579 | `lock_help_guide` | More keys: everyday Windows shortcuts | Full guide | Полная инструкция | ⚠ long (10→17 chars) — check layout |
| 580 | `lock_help_done` | More keys: everyday Windows shortcuts | Done | Готово |  |
| 581 | `title_surface_lift` | More keys: everyday Windows shortcuts | Surface lift | Подъём поверхностей |  |
| 582 | `summary_amoled_lift` | More keys: everyday Windows shortcuts | Surface lift: %1$d of %2$d. Tap to adjust. | Подъём поверхностей: %1$d из %2$d. Нажмите, чтобы настроить. |  |
| 583 | `surface_lift_hint` | More keys: everyday Windows shortcuts | Moves the cards, fields and sections of Pure black from flat to lifted. The page stays black | Переводит карточки, поля и разделы режима «Чистый чёрный» от плоских к приподнятым. Страница остаётся чёрной |  |
| 584 | `surface_lift_position` | More keys: everyday Windows shortcuts | %1$d of %2$d | %1$d из %2$d |  |
| 585 | `surface_lift_recommended` | More keys: everyday Windows shortcuts | Recommended | Рекомендуется |  |
| 586 | `surface_lift_reset` | More keys: everyday Windows shortcuts | Reset | Сбросить |  |
| 587 | `surface_lift_sample_card` | More keys: everyday Windows shortcuts | Section | Раздел |  |
| 588 | `surface_lift_sample_field` | More keys: everyday Windows shortcuts | Field | Поле |  |
| 589 | `surface_lift_sample_highest` | More keys: everyday Windows shortcuts | Selected item | Выбранный элемент |  |
| 590 | `lock_key_sent` | More keys: everyday Windows shortcuts | Lock sent to the PC | Блокировка отправлена на ПК |  |
| 591 | `lock_key_hint` | More keys: everyday Windows shortcuts | Windows ignores Win+L from a stream. Add a Lock command in Apollo, or see Settings, Host, Lock key does nothing? | Windows игнорирует Win+L из стрима. Добавьте команду Lock в Apollo или откройте в настройках раздел «Настройки хоста» → «Клавиша блокировки не работает?» |  |

## 2. Уже были в приложении — вычитка (исправлено: 171, «было → стало» с причиной)

| № | Ключ | English | Русский | Проверка |
|---|---|---|---|---|
| 592 | `scut_deleted_pc` | PC deleted | ПК удалён |  |
| 593 | `scut_not_paired` | PC not paired | ПК не сопряжён |  |
| 594 | `scut_pc_not_found` | PC not found | ПК не найден |  |
| 595 | `scut_invalid_uuid` | Provided PC is not valid | Указанный ПК недействителен |  |
| 596 | `scut_invalid_app_id` | Provided App is not valid | Указанное приложение недействительно |  |
| 597 | `menu_button` | Menu | Меню |  |
| 598 | `quick_menu_title` | Quick Menu | Быстрое меню |  |
| 599 | `configuration_mode_move_buttons` | Move buttons mode | Режим перемещения кнопок |  |
| 600 | `configuration_mode_resize_buttons` | Resize buttons mode | Режим изменения размера кнопок |  |
| 601 | `configuration_mode_disable_enable_buttons` | Enable/Disable buttons mode | Режим вкл./выкл. кнопок |  |
| 602 | `configuration_mode_exiting` | Exiting configuration mode | Выход из режима настройки |  |
| 603 | `help_loading_title` | Help Viewer | ~~Просмотр помощи~~ → **Справка**<br>_«Просмотр помощи» — калька_ |  |
| 604 | `help_loading_msg` | Loading help page… | Загрузка страницы помощи… |  |
| 605 | `align_left` | Align Left | Выровнять влево |  |
| 606 | `align_center` | Align Center | Выровнять по центру |  |
| 607 | `align_right` | Align Right | Выровнять вправо |  |
| 608 | `pcview_menu_header_online` | Online | В сети |  |
| 609 | `pcview_menu_header_offline` | Offline | Не в сети |  |
| 610 | `pcview_menu_header_unknown` | Refreshing | Обновление |  |
| 611 | `pcview_menu_app_list` | View All Apps | ~~Посмотреть список игр~~ → **Показать все приложения**<br>_владелец: Apps — приложения, не игры_ | ⚠ long (13→21 chars) — check layout<br>⚠ long (13→23 chars) — check layout |
| 612 | `pcview_menu_pair_pc` | Legacy Pair | ~~Сопряжение с ПК~~ → **Сопряжение (старый способ)**<br>_владелец: неверный перевод — потерян смысл Legacy (старый способ сопряжения рядом с OTP)_ | ⚠ long (11→26 chars) — check layout |
| 613 | `pcview_menu_pair_pc_otp` | OTP Pair | ~~Сопряжение с ПК по OTP~~ → **Сопряжение по OTP**<br>_в паре с Legacy Pair: «с ПК» убрано в обоих, различие — способ_ | ⚠ long (8→22 chars) — check layout<br>⚠ long (8→17 chars) — check layout |
| 614 | `pcview_menu_unpair_pc` | Unpair | Отменить сопряжение | ⚠ long (6→19 chars) — check layout |
| 615 | `pcview_menu_send_wol` | Send Wake-On-LAN request | Отправить Wake-On-LAN запрос |  |
| 616 | `pcview_menu_delete_pc` | Delete PC | Удалить ПК |  |
| 617 | `pcview_menu_test_network` | Test Network Connection | ~~Тестовое подключение к сети~~ → **Проверить подключение к сети**<br>_смысл: действие, не «Тестовое подключение»_ |  |
| 618 | `pcview_menu_details` | View Details | Посмотреть детали |  |
| 619 | `pcview_menu_eol` | NVIDIA GameStream End-of-Service | ~~NVIDIA GameStream обслуживание окончено~~ → **Прекращение поддержки NVIDIA GameStream**<br>_нескладно: «обслуживание окончено»_ |  |
| 620 | `pcview_menu_open_management_page` | Go to Server Config | Открыть настройки сервера |  |
| 621 | `pcview_error_no_management_url` | Cannot open server config page, cannot find server address. | ~~Невозможно открыть страницу настроек сервера - адрес не найден.~~ → **Невозможно открыть страницу настроек сервера — адрес сервера не найден.**<br>_дефис вместо тире_ |  |
| 622 | `nettest_title_waiting` | Testing Network Connection | Тестирование сетевого подключения |  |
| 623 | `nettest_text_waiting` | Super Artemis is testing your network connection to determine if any required ports are blocked.\n\nThis may take a few seconds… | ~~Super Artemis тестирует ваше сетевое подключение, чтобы определить, заблокированы ли нужные порты. \n \nЭто может занять некоторое время…~~ → **Super Artemis проверяет ваше сетевое подключение, чтобы определить, не заблокированы ли нужные порты.\n\nЭто может занять несколько секунд…**<br>_смысл: «a few seconds», а не «некоторое время»; лишние переводы строк в разметке_ |  |
| 624 | `nettest_title_done` | Network Test Complete | Тестирование подключения завершено | ⚠ long (21→34 chars) — check layout |
| 625 | `nettest_text_success` | Your network does not appear to be blocking Super Artemis. If you still have trouble connecting, check your PC\'s firewall settings.\n\nIf you are trying to stream over the Internet, install the Super Artemis Internet Hosting Tool on your PC and run the included Internet Streaming Tester to check your PC\'s Internet connection. | ~~Ваша сеть не блокирует Super Artemis. Если у вас всё ещё есть проблемы с соединением, проверьте настройки брандмауэра на компьютере.\n\nЕсли вы пытаетесь транслировать через интернет, установите Super Artemis Internet Hosting Tool на ваш компьютер и запустите установленный Internet Streaming Tester, чтобы проверить Интернет-соединение на вашем компьютере.~~ → **Похоже, ваша сеть не блокирует Super Artemis. Если у вас всё ещё есть проблемы с соединением, проверьте настройки брандмауэра на компьютере.\n\nЕсли вы хотите стримить через интернет, установите на компьютер Super Artemis Internet Hosting Tool и запустите входящий в него Internet Streaming Tester, чтобы проверить подключение компьютера к интернету.**<br>_смысл потерян: «does not appear» (похоже); «included» ≠ «установленный»; «транслировать» → «стримить»; «Интернет» с прописной_ |  |
| 626 | `nettest_text_inconclusive` | The network test could not be performed because none of Super Artemis\'s connection testing servers were reachable. Check your Internet connection or try again later. | ~~Тестирование подключения не может быть выполнено, потому что сервера тестирования подключения Super Artemis не доступны. Проверьте ваше Интернет-соединение или повторите попытку позже.~~ → **Не удалось выполнить проверку сети: ни один из серверов проверки подключения Super Artemis не доступен. Проверьте подключение к интернету или повторите попытку позже.**<br>_ошибки: «сервера», «не доступны»; «none of» потеряно; «Интернет» с прописной_ |  |
| 627 | `nettest_text_failure` | Your device\'s current network connection seems to be blocking Super Artemis. Streaming over the Internet may not work while connected to this network.\n\nThe following network ports were blocked:\n | ~~Похоже, что текущее сетевое подключение вашего устройства блокирует Super Artemis. Трансляция через Интернет может не работать при подключении к этой сети.\n\nСледующие сетевые порты были заблокированы:\n~~ → **Похоже, что текущее сетевое подключение вашего устройства блокирует Super Artemis. Стрим через интернет может не работать при подключении к этой сети.\n\nСледующие сетевые порты были заблокированы:\n**<br>_термин: «трансляция» → «стрим»_ |  |
| 628 | `nettest_text_blocked` | Your device\'s current network connection is blocking Super Artemis. Streaming over the Internet may not work while connected to this network. | ~~Текущее сетевое соединение вашего устройства блокирует Super Artemis. Потоковая передача через Интернет может не работать при подключении к этой сети.~~ → **Текущее сетевое подключение вашего устройства блокирует Super Artemis. Стрим через интернет может не работать при подключении к этой сети.**<br>_термин: «потоковая передача» → «стрим»; «Интернет» с прописной_ |  |
| 629 | `pairing` | Pairing… | Сопряжение… |  |
| 630 | `pair_pc_confirm_title` | Pair PC | Сопряжение с ПК | ⚠ long (7→15 chars) — check layout |
| 631 | `pair_pc_confirm_message` | Do you really want to pair with %s? Please do not pair with any unfamiliar computers. | Вы действительно хотите выполнить сопряжение с %s? Не выполняйте сопряжение с незнакомыми компьютерами. |  |
| 632 | `pair_pc_offline` | Computer is offline | ~~Компьютер выключен или находится не в сети~~ → **Компьютер не в сети**<br>_владелец: переборщили — «выключен» в английском нет_ | ⚠ long (19→42 chars) — check layout |
| 633 | `pair_pc_ingame` | Computer is currently in a game. You must close the game before pairing. | ~~Компьютер в данный момент находится в игре. Вы должны закрыть игру перед сопряжением.~~ → **На компьютере сейчас запущена игра. Перед сопряжением её нужно закрыть.**<br>_калька «находится в игре», «Вы должны»_ |  |
| 634 | `pair_pairing_title` | Pairing | Сопряжение |  |
| 635 | `pair_pairing_msg` | Please enter the following PIN on the target PC: | ~~Пожалуйста введите этот PIN на целевом ПК:~~ → **Пожалуйста, введите этот PIN на целевом ПК:**<br>_пропущена запятая_ |  |
| 636 | `pair_pairing_help` | If your host PC is running Sunshine, navigate to the Sunshine web UI to enter the PIN. | Если на вашем хост-ПК установлен Sunshine, перейдите в веб-интерфейс Sunshine и введите PIN-код. |  |
| 637 | `pair_otp_pairing_msg` | Pairing, please wait… | Сопряжение, подождите… |  |
| 638 | `pair_otp_pairing_help` | OTP pairing is only available with Apollo, enter the PIN you just provided on the web UI manually if you\'re using other host software. | Сопряжение по OTP доступно только с Apollo. При использовании другого ПО введите PIN вручную в веб-интерфейсе. |  |
| 639 | `pair_incorrect_pin` | Incorrect PIN or Passphrase | ~~Неправильный PIN~~ → **Неправильный PIN или пароль**<br>_владелец: неполный перевод — потерян «или пароль»_ |  |
| 640 | `pair_fail` | Pairing failed | Сопряжение не удалось |  |
| 641 | `pair_already_in_progress` | Pairing already in progress | ~~Сопряжение уже в процессе~~ → **Сопряжение уже выполняется**<br>_«в процессе» — калька_ |  |
| 642 | `pair_passphrase_hint` | Passphrase | Пароль |  |
| 643 | `pair_pin_length_msg` | Pin must be 4 digits long | PIN должен состоять из 4 цифр |  |
| 644 | `pair_passphrase_length_msg` | Passphrase must be at least 4 characters long | Пароль должен быть не менее 4 символов |  |
| 645 | `wol_pc_online` | Computer is online | Компьютер в сети |  |
| 646 | `wol_no_mac` | Unable to wake PC because there is no stored MAC address | ~~Невозможно разбудить компьютер, поскольку нет сохраненного MAC-адреса~~ → **Невозможно разбудить компьютер, поскольку нет сохранённого MAC-адреса**<br>_ё_ |  |
| 647 | `wol_waking_pc` | Waking PC… | Пробуждение ПК… |  |
| 648 | `wol_waking_msg` | It may take a few seconds for your PC to wake up. 	    If it doesn\'t, make sure it\'s configured properly for Wake-On-LAN.      | ~~Пробуждение ПК может занять несколько секунд. Если этого не происходит, удостоверьтесь что Wake-On-LAN настроен правильно.~~ → **Пробуждение ПК может занять несколько секунд. Если этого не происходит, убедитесь, что ПК правильно настроен для Wake-On-LAN.**<br>_пропущена запятая перед «что»_ |  |
| 649 | `wol_fail` | Failed to send Wake-On-LAN packets | Ошибка при отправке Wake-On-LAN пакетов |  |
| 650 | `unpairing` | Unpairing… | Отмена сопряжения… | ⚠ long (10→18 chars) — check layout |
| 651 | `unpair_success` | Unpaired successfully | Сопряжение успешно отменено |  |
| 652 | `unpair_fail` | Failed to unpair | Отменить сопряжение не удалось | ⚠ long (16→30 chars) — check layout |
| 653 | `unpair_error` | Device was not paired | Устройство не было сопряжено |  |
| 654 | `error_pc_offline` | Computer is offline | ~~Компьютер выключен или находится не в сети~~ → **Компьютер не в сети**<br>_двойник pair_pc_offline: та же английская строка_ | ⚠ long (19→42 chars) — check layout |
| 655 | `error_manager_not_running` | The ComputerManager service is not running. Please wait a few seconds or restart the app. | Сервис ComputerManager не запущен. Пожалуйста, подождите несколько секунд или перезапустите приложение. |  |
| 656 | `error_unknown_host` | Failed to resolve host | Не удалось найти хост |  |
| 657 | `error_404` | GFE returned an HTTP 404 error. Make sure your PC is running a supported GPU. 	    Using remote desktop software can also cause this error. Try rebooting your machine or reinstalling GFE.      | ~~GFE вернул ошибку HTTP 404. Убедитесь что Ваш ПК использует поддерживаемый GPU. Использование программ для удалённого доступа также может вызывать эту ошибку. Попробуйте перезагрузить компьютер или переустановить GFE.~~ → **GFE вернул ошибку HTTP 404. Убедитесь, что ваш ПК использует поддерживаемый GPU. Использование программ для удалённого доступа также может вызывать эту ошибку. Попробуйте перезагрузить компьютер или переустановить GFE.**<br>_пропущена запятая; «Ваш» с прописной_ |  |
| 658 | `title_decoding_error` | Video Decoder Crashed | ~~Сбой декодирования видео~~ → **Сбой видеодекодера**<br>_смысл: упал декодер, не декодирование_ |  |
| 659 | `message_decoding_error` | Super Artemis has crashed due to an incompatibility with this device\'s video decoder. Try adjusting the streaming settings if the crashes continue. | ~~Super Artemis произошел сбой из-за несовместимости с видеодекодером этого устройства. Попробуйте изменить настройки потоковой передачи, если сбои продолжаются.~~ → **В Super Artemis произошёл сбой из-за несовместимости с видеодекодером этого устройства. Если сбои продолжатся, попробуйте изменить настройки стрима.**<br>_грамматика («Super Artemis произошел сбой»), ё; термин «потоковая передача» → «стрим»_ |  |
| 660 | `title_decoding_reset` | Video Settings Reset | Настройки видео были сброшены |  |
| 661 | `message_decoding_reset` | Your device\'s video decoder continues to crash at your selected streaming settings. Your streaming settings have been reset to default. | ~~Видео декодер Вашего устройства давал сбои с выбранными настройками. Настройки трансляции были сброшены до значений по умолчанию.~~ → **Видеодекодер вашего устройства продолжает давать сбои с выбранными настройками стрима. Настройки стрима сброшены до значений по умолчанию.**<br>_«Видео декодер», «Вашего»; «continues» потеряно; «трансляция» → «стрим»_ |  |
| 662 | `error_usb_prohibited` | USB access is prohibited by your device administrator. Check your Knox or MDM settings. | ~~USB доступ запрещён администратором устройства. Проверьте настройки Knox или MDM.~~ → **Доступ к USB запрещён администратором устройства. Проверьте настройки Knox или MDM.**<br>_«USB доступ» — калька без дефиса_ |  |
| 663 | `unable_to_pin_shortcut` | Your current launcher does not allow for creating pinned shortcuts. | Текущий лаунчер не позволяет создавать закреплённые ярлыки. |  |
| 664 | `video_decoder_init_failed` | Video decoder failed to initialize. Your device may not support the selected resolution or frame rate. | ~~Видеодекодер не инициализирован. Ваше устройство может не поддерживать выбранное разрешение или частоту кадров.~~ → **Не удалось инициализировать видеодекодер. Ваше устройство может не поддерживать выбранное разрешение или частоту кадров.**<br>_смысл: «failed to initialize» ≠ «не инициализирован»_ |  |
| 665 | `no_video_received_error` | No video received from host. | Видео от хоста не получено. |  |
| 666 | `no_frame_received_error` | Your network connection isn\'t performing well. Reduce your video bitrate setting or try a faster connection. | ~~Ваше сетевое подключение не справляется с заданными настройками. Попробуйте изменить битрейт или использовать более быстрое подключение.~~ → **Ваше сетевое подключение работает плохо. Уменьшите битрейт видео или используйте более быстрое подключение.**<br>_смысл: «Reduce» → «изменить» потерян_ |  |
| 667 | `early_termination_error` | Something went wrong on your host PC when starting the stream.\n\nMake sure you don\'t have any DRM-protected content open on your host PC. You can also try restarting your host PC. | ~~При запуске потока на вашем хост-компьютере что-то пошло не так. \n \nУбедитесь, что на вашем хост-ПК не открыт контент, защищенный DRM. Вы также можете попробовать перезагрузить хост-компьютер.~~ → **При запуске стрима на вашем хост-компьютере что-то пошло не так.\n\nУбедитесь, что на вашем хост-ПК не открыт контент, защищённый DRM. Вы также можете попробовать перезагрузить хост-компьютер.**<br>_«поток» → «стрим»; ё; лишние переводы строк в разметке_ |  |
| 668 | `frame_conversion_error` | The host PC reported a fatal video encoding error.\n\nTry disabling HDR mode, changing the streaming resolution, or changing your host PC\'s display resolution. | ~~Хост-ПК сообщил о критической ошибке кодирования видео. \n \nПопробуйте выключить HDR, изменить разрешение стрима или разрешение экрана на хост-ПК.~~ → **Хост-ПК сообщил о критической ошибке кодирования видео.\n\nПопробуйте выключить HDR, изменить разрешение стрима или разрешение экрана на хост-ПК.**<br>_лишние переводы строк в разметке (пробелы в начале строк)_ |  |
| 669 | `check_ports_msg` | Check your firewall and port forwarding rules for port(s): | Проверьте свой брандмауэр и правила переадресации портов для порта(ов): |  |
| 670 | `conn_establishing_title` | Establishing Connection | ~~Создание соединения~~ → **Установка соединения**<br>_«Создание соединения» — калька_ |  |
| 671 | `conn_establishing_msg` | Starting connection | Подключение |  |
| 672 | `conn_metered` | Warning: Your active network connection is metered! | ~~Внимание: Происходит измерение Вашего сетевого соединения!~~ → **Внимание: текущее сетевое подключение — лимитное!**<br>_неверный смысл: metered = лимитное, а не «происходит измерение»_ |  |
| 673 | `conn_client_latency` | Average frame decoding latency: | Средняя задержка декодирования кадра:  |  |
| 674 | `conn_client_latency_hw` | hardware decoder latency: | Задержка аппаратного декодирования: |  |
| 675 | `conn_hardware_latency` | Average hardware decoding latency: | Средняя задержка аппаратного декодирования: |  |
| 676 | `conn_starting` | Starting | Запуск |  |
| 677 | `conn_error_title` | Connection Error | Ошибка соединения |  |
| 678 | `conn_error_msg` | Failed to start | Запуск не удался |  |
| 679 | `conn_terminated_title` | Connection Terminated | Соединение разорвано |  |
| 680 | `conn_terminated_msg` | The connection was terminated. | Подключение было прервано. |  |
| 681 | `error_code_prefix` | Error code: | Код ошибки: |  |
| 682 | `ip_hint` | IP address of host PC | IP-адрес хост-ПК |  |
| 683 | `searching_pc` | Searching for host PCs on your local network…\n\n         Ensure Apollo is running on your host PC. | ~~Поиск хост-ПК в вашей локальной сети… \n \n Убедитесь, что Sunshine работает на вашем хост-компьютере или GameStream включен в настройках GeForce Experience SHIELD.~~ → **Поиск хост-ПК в вашей локальной сети…\n\nУбедитесь, что на хост-ПК запущен Apollo.**<br>_устарел: описывает Sunshine и GeForce Experience вместо Apollo_ | ⚠ brand "Apollo" missing |
| 684 | `yes` | Yes | Да |  |
| 685 | `no` | No | Нет |  |
| 686 | `lost_connection` | Lost connection to PC | Потеряно соединение с ПК |  |
| 687 | `title_details` | Details | Детали |  |
| 688 | `help` | Help | Помощь |  |
| 689 | `delete_pc_msg` | Are you sure you want to delete this PC? | ~~Вы уверены что хотите удалить этот ПК?~~ → **Вы уверены, что хотите удалить этот ПК?**<br>_пропущена запятая_ |  |
| 690 | `slow_connection_msg` | Slow connection to PC\nReduce your bitrate | Медленное подключение к ПК \nСнизьте битрейт |  |
| 691 | `poor_connection_msg` | Poor connection to PC | Слабое соединение с ПК |  |
| 692 | `perf_overlay_streamdetails` | Video stream: %1$s %2$.2f FPS | Видеострим: %1$s %2$.2f FPS |  |
| 693 | `perf_overlay_decoder` | Decoder: %1$s | Декодер: %1$s |  |
| 694 | `perf_overlay_incomingfps` | Incoming frame rate from network: %1$.2f FPS | Входящая частота кадров из сети: %1$.2f FPS |  |
| 695 | `perf_overlay_renderingfps` | Rendering frame rate: %1$.2f FPS | Частота кадров при рендеринге: %1$.2f FPS |  |
| 696 | `perf_overlay_hostprocessinglatency` | Host processing latency min/max/average: %1$.1f/%2$.1f/%3$.1f ms | Задержка обработки хоста мин/макс/среднее: %1$.1f/%2$.1f/%3$.1f мс |  |
| 697 | `perf_overlay_netdrops` | Frames dropped by your network connection: %1$.2f%% | Кадры, пропущенные вашим сетевым подключением: %1$.2f%% |  |
| 698 | `perf_overlay_netlatency` | Average network latency: %1$d ms (variance: %2$d ms) | Средняя задержка сети: %1$d мс (дисперсия: %2$d мс) |  |
| 699 | `perf_overlay_dectime` | Average decoding time: %1$.2f ms | Среднее время декодирования: %1$.2f мс |  |
| 700 | `perf_overlay_drawdelay` |  Delay: %1$.2f ms | " Задержка: %1$.2f мс" |  |
| 701 | `email_prefix_message` |          Please send this email as-is to artemistics.logs@gmail.com to support the community.\n         Your shared performance data will help improve and expand the dataset available at:\n         https://tinyurl.com/artemis-performance\n\n      | ~~"\n        Пожалуйста отправьте это письмо как есть на artemistics.logs@gmail.com чтобы поддержать сообщество. \n\n        Ваши данные о производительности помогут улучшить и расширить набор данных по ссылке: \n\n        https://tinyurl.com/artemis-performance       "~~ → **Пожалуйста, отправьте это письмо как есть на artemistics.logs@gmail.com, чтобы поддержать сообщество.\nВаши данные о производительности помогут улучшить и расширить набор данных по ссылке:\nhttps://tinyurl.com/artemis-performance\n\n**<br>_пропущены запятые; лишний перенос строки (\n не совпадали с английским)_ | ⚠ \n count differs |
| 702 | `email_subject` | Artemistics - Performance Log | Artemistics - журнал производительности |  |
| 703 | `email_chooser_title` | Send performance log... | Отправить журнал производительности... | ⚠ long (23→38 chars) — check layout |
| 704 | `toast_no_email_clients` | No email clients installed. | Почтовые клиенты не установлены. |  |
| 705 | `toast_no_logs` | There is no performance data stored yet. | Данные о производительности отсутствуют. |  |
| 706 | `applist_connect_msg` | Connecting to PC… | Подключение к ПК… |  |
| 707 | `applist_menu_resume` | Resume Session | Возобновить сессию |  |
| 708 | `applist_menu_start_vdisplay` | Start in Virtual Display | ~~Запустить в виртуальном дисплее~~ → **Запустить на виртуальном дисплее**<br>_предлог «в дисплее»_ |  |
| 709 | `applist_menu_start_primarydisplay` | Start in Primary Display | Запустить на основном дисплее |  |
| 710 | `applist_menu_quit` | Quit Session | ~~Выйти из сессии~~ → **Завершить сессию**<br>_одна английская строка была переведена двумя способами; оставлен вариант игрового меню_ |  |
| 711 | `applist_menu_quit_and_start` | Quit Current Game and Start | Выйти из текущей игры и запустить |  |
| 712 | `applist_menu_quit_and_start_vdisplay` | Quit Current Game and Start in Virtual Display | ~~Завершить игру и запустить в виртуальном дисплее~~ → **Завершить игру и запустить на виртуальном дисплее**<br>_предлог: «на дисплее» (как в «на основном дисплее»)_ |  |
| 713 | `applist_menu_quit_and_start_primarydisplay` | Quit Current Game and Start in Primary Display | Завершить игру и запустить на основном дисплее |  |
| 714 | `applist_menu_cancel` | Cancel | Отмена |  |
| 715 | `applist_menu_details` | View Details | Посмотреть детали |  |
| 716 | `applist_menu_scut` | Create Shortcut | Создать ярлык |  |
| 717 | `applist_menu_export_launcher` | Export Launcher File | Экспортировать файл запуска |  |
| 718 | `applist_menu_tv_channel` | Add to Channel | Добавить в канал |  |
| 719 | `applist_menu_hide_app` | Hide App | Скрыть приложение | ⚠ long (8→17 chars) — check layout |
| 720 | `applist_refresh_title` | App List | Список приложений | ⚠ long (8→17 chars) — check layout |
| 721 | `applist_refresh_msg` | Refreshing apps… | Обновление приложений… |  |
| 722 | `applist_refresh_error_title` | Error | Ошибка |  |
| 723 | `applist_refresh_error_msg` | Failed to get app list | Ошибка при получении списка приложений | ⚠ long (22→38 chars) — check layout |
| 724 | `applist_quit_app` | Quitting | Выход из |  |
| 725 | `applist_quit_success` | Successfully quit | Выход произошёл успешно из |  |
| 726 | `applist_quit_fail` | Failed to quit | Ошибка при выходе |  |
| 727 | `applist_quit_confirmation` | Are you sure you want to quit the running app? All unsaved data will be lost. | Вы уверены, что хотите выйти из запущенного приложения? Все несохранённые данные будут потеряны. |  |
| 728 | `applist_details_id` | App ID: | ID приложения: | ⚠ long (7→14 chars) — check layout |
| 729 | `title_add_pc` | Add PC Manually | Добавление ПК вручную |  |
| 730 | `msg_add_pc` | Connecting to the PC… | Соединение с ПК… |  |
| 731 | `addpc_fail` | Unable to connect to the specified computer. Make sure the required ports are allowed through the firewall. | Не удалось подключиться к выбранному компьютеру. Удостоверьтесь, что необходимые порты разрешены в настройках брандмауэра. |  |
| 732 | `addpc_success` | Successfully added computer | Компьютер добавлен успешно |  |
| 733 | `addpc_unknown_host` | Unable to resolve PC address. Make sure you didn\'t make a typo in the address. | ~~Не удалось найти ПК по указанному адресу. Убедитесь, что Вы не совершили ошибок во время его написания.~~ → **Не удалось определить адрес ПК. Проверьте, нет ли опечатки в адресе.**<br>_калька, «Вы» с прописной; resolve ≠ «найти ПК»_ |  |
| 734 | `addpc_enter_ip` | You must enter an IP address | ~~Вы должны ввести IP адрес~~ → **Введите IP-адрес**<br>_дефис и вежливая форма_ |  |
| 735 | `addpc_wrong_sitelocal` | That address doesn\'t look right. You must use your router\'s public IP address for streaming over the Internet. | ~~Адрес указан неверно. Вы должны ввести публичный IP-адрес Вашего роутера для передачи через интернет.~~ → **Похоже, адрес указан неверно. Для стрима через интернет нужно указать публичный IP-адрес вашего роутера.**<br>_«doesn't look right» потеряно; калька «Вы должны», «Вашего»; «передача» → «стрим»_ |  |
| 736 | `category_general_settings` | Clipboard | ~~Общие настройки~~ → **Буфер обмена**<br>_смысл потерян: раздел буфера обмена назван «Общие настройки»_ | ⚠ long (9→15 chars) — check layout |
| 737 | `category_video_settings` | Video | Настройки видео | ⚠ long (5→15 chars) — check layout |
| 738 | `title_resolution_list` | Video resolution | Разрешение |  |
| 739 | `summary_resolution_list` | Increase to improve image clarity. Decrease for better performance on lower end devices and slower networks. | ~~Увеличьте для повышения чёткости изображения. Уменьшите для лучшей производительности на медленных устройствах или сетях.~~ → **Увеличьте для повышения чёткости изображения. Уменьшите для лучшей производительности на слабых устройствах и в медленных сетях.**<br>_грамматика: «на … сетях»_ |  |
| 740 | `title_native_res_dialog` | Native Resolution Warning | Предупреждение о родном разрешении |  |
| 741 | `title_fps_list` | Video frame rate | Частота кадров |  |
| 742 | `summary_fps_list` | Increase for a smoother video stream. Decrease for better performance on lower end devices. | ~~Увеличение для более плавного видео потока. Уменьшите для лучшей производительности на более слабых устройствах.~~ → **Увеличьте для более плавного видеопотока. Уменьшите для лучшей производительности на более слабых устройствах.**<br>_«Увеличение» вместо повелительного; «видео потока»_ |  |
| 743 | `title_seekbar_bitrate` | Video bitrate | ~~Выберите битрейт видео~~ → **Битрейт видео**<br>_заголовок настройки, а не просьба «Выберите…»_ | ⚠ long (13→22 chars) — check layout |
| 744 | `summary_seekbar_bitrate` | Increase for better image quality. Decrease to improve performance on slower connections. | Увеличьте для лучшего качества изображения. Уменьшите, чтобы улучшить производительность при более медленных соединениях. |  |
| 745 | `title_seekbar_metered_bitrate` | Video bitrate on metered networks | Битрейт в тарифицируемых сетях |  |
| 746 | `summary_seekbar_metered_bitrate` | High bitrates consume more data, lower bitrates improve smoothness in metered networks.\nSet 0 for ¼ of the above bitrate settings. | ~~Высокий битрейт потребляет больше трафика, низкий - повышает плавность в платных сетях.\nУстановите 0 для ¼ от указанного значения.~~ → **Высокий битрейт расходует больше трафика, низкий — повышает плавность в лимитных сетях.\nУстановите 0, чтобы использовать ¼ от битрейта, заданного выше.**<br>_metered = лимитные, не «платные»; дефис вместо тире; «¼ от указанного значения» неточно_ |  |
| 747 | `suffix_seekbar_bitrate_mbps` | Mbps | Мбит/с |  |
| 748 | `title_resolution_scale_factor` | Resolution Scale Factor | Коэффициент масштабирования разрешения | ⚠ long (23→38 chars) — check layout |
| 749 | `summary_resolution_scale_factor` | Server side requested virtual screen resolution will be multiplied by this factor. Streaming resolution are not affected.\ne.g. 120% will make 2000x1000 become 2400x1200.\nSetting a higher scale factor will improve image quality for some games.\nRequires Apollo to take effect. | ~~Запрашиваемое на сервере виртуальное разрешение экрана будет умножено на этот коэффициент. Разрешение стрима не изменяется.\nПример: 120% превратит 2000×1000 в 2400×1200.\nПовышение коэффициента может улучшить качество изображения в некоторых играх.\nТребуется Apollo для применения.~~ → **Запрашиваемое на сервере виртуальное разрешение экрана будет умножено на этот коэффициент. Разрешение стрима не изменяется.\nПример: 120% превратит 2000×1000 в 2400×1200.\nПовышение коэффициента может улучшить качество изображения в некоторых играх.\nРаботает только с Apollo.**<br>_калька «Требуется Apollo для применения»_ |  |
| 750 | `resolution_prefix_native` | Native | Нативное |  |
| 751 | `resolution_prefix_native_fullscreen` | Native Full-Screen | Родной полноэкранный режим |  |
| 752 | `resolution_prefix_native_landscape` | (Landscape) | (Горизонтальный) |  |
| 753 | `resolution_prefix_native_portrait` | (Portrait) | (Портретный) |  |
| 754 | `resolution_prefix_custom` | Custom | Пользовательский | ⚠ long (6→16 chars) — check layout |
| 755 | `fps_suffix_fps` | FPS | FPS | ⚠ identical to English |
| 756 | `title_native_fps_dialog` | Native FPS Warning | ~~Встроенное предупреждение о FPS~~ → **Предупреждение о родной частоте кадров**<br>_смысл искажён: «Встроенное предупреждение»_ | ⚠ long (18→31 chars) — check layout<br>⚠ long (18→38 chars) — check layout |
| 757 | `title_checkbox_auto_invert_video_resolution` | Auto Invert Resolution | Авто-инверсия разрешения |  |
| 758 | `summary_checkbox_auto_invert_video_resolution` | Automatically invert the width and height of the video stream when in portrait mode.\nFor example: 1920x1080 will become 1080x1920. | Автоматически менять местами ширину и высоту видеопотока в портретном режиме.\nНапример: 1920×1080 станет 1080×1920. |  |
| 759 | `title_video_scale_mode` | Video Scale Mode | Режим масштабирования видео | ⚠ long (16→27 chars) — check layout |
| 760 | `summary_video_scale_mode` | Select between Fit, Fill and Stretch | ~~Выберите между Подогнать, Заполнить и Растянуть.~~ → **Подогнать, заполнить или растянуть**<br>_нескладно, лишняя точка_ |  |
| 761 | `video_scale_mode_fit` | Fit | Подогнать | ⚠ long (3→9 chars) — check layout |
| 762 | `video_scale_mode_fill` | Fill | Заполнить | ⚠ long (4→9 chars) — check layout |
| 763 | `video_scale_mode_stretch` | Stretch | Растянуть |  |
| 764 | `category_audio_settings` | Audio | ~~Аудио настройки~~ → **Настройки звука**<br>_порядок слов: «Аудио настройки» не по-русски_ | ⚠ long (5→15 chars) — check layout<br>⚠ long (5→15 chars) — check layout |
| 765 | `title_audio_config_list` | Surround sound configuration | Настройка объёмного звука |  |
| 766 | `summary_audio_config_list` | Enable 5.1 or 7.1 surround sound for home-theater systems | Включить объёмный звук 5.1 или 7.1 для систем домашнего кинотеатра |  |
| 767 | `title_checkbox_enable_audiofx` | Enable system equalizer support | Включить поддержку системного эквалайзера |  |
| 768 | `summary_checkbox_enable_audiofx` | Allows audio effects to function while streaming, but may increase audio latency | ~~Позволяет работать аудио эффектам во время стрима, но может увеличить задержку звука~~ → **Позволяет работать аудиоэффектам во время стрима, но может увеличить задержку звука**<br>_опечатка: «аудио эффектам»_ |  |
| 769 | `category_gamepad_settings` | Gamepad | Настройки геймпада | ⚠ long (7→18 chars) — check layout |
| 770 | `title_checkbox_multi_controller` | Automatic gamepad presence detection | ~~Поддержка нескольких контроллеров~~ → **Автоопределение подключённых геймпадов**<br>_смысл потерян: было «Поддержка нескольких контроллеров»_ |  |
| 771 | `summary_checkbox_multi_controller` | Unchecking this option forces a gamepad to always be present | ~~Когда отключена, все контроллеры определяются как один~~ → **Если выключить, геймпад на ПК будет присутствовать всегда**<br>_неверный смысл (устарел): «все контроллеры как один» вместо «геймпад присутствует всегда»_ |  |
| 772 | `title_checkbox_vibrate_fallback` | Emulate rumble support with vibration | ~~Эмуляция виброотдачи~~ → **Эмулировать отдачу вибрацией устройства**<br>_неполный перевод_ |  |
| 773 | `summary_checkbox_vibrate_fallback` | Vibrates your device to emulate rumble if your gamepad does not support it | ~~Вибрировать устройство для эмуляции виброотдачи, если ваш геймпад её не поддерживает.~~ → **Использовать вибрацию устройства для эмуляции виброотдачи, если ваш геймпад её не поддерживает**<br>_грамматика: «вибрировать устройство»; лишняя точка_ |  |
| 774 | `title_seekbar_vibrate_fallback_strength` | Adjust emulated rumble intensity | ~~Отрегулируйте интенсивность эмулируемой вибрации~~ → **Интенсивность эмулируемой вибрации**<br>_заголовок настройки, а не просьба «Отрегулируйте»_ |  |
| 775 | `summary_seekbar_vibrate_fallback_strength` | Amplify or reduce the vibration intensity on your device | Увеличьте или уменьшите интенсивность вибрации на вашем устройстве |  |
| 776 | `suffix_seekbar_vibrate_fallback_strength` | % | % |  |
| 777 | `title_seekbar_deadzone` | Adjust analog stick deadzone | Регулировать мёртвую зону аналогового стика |  |
| 778 | `summary_seekbar_deadzone` | Positive values set a normal dead zone, negative values apply dead zone compensation. Ensure your controller can adjust dead zones when using dead zone compensation, or centering may be difficult. | ~~Некоторые игры могут принудительно увеличить мёртвую зону вместо указанной в Super Artemis.~~ → **Положительные значения задают обычную мёртвую зону, отрицательные — компенсацию мёртвой зоны. При компенсации убедитесь, что в вашем контроллере можно настроить мёртвые зоны, иначе центрирование может быть затруднено.**<br>_устарел: описывает совсем другой текст_ |  |
| 779 | `suffix_seekbar_deadzone` | % | % |  |
| 780 | `title_checkbox_xb1_driver` | Xbox 360/One/NintendoPro USB gamepad driver | ~~Драйвер контроллеров Xbox 360/One~~ → **USB-драйвер геймпадов Xbox 360/One/Nintendo Pro**<br>_неполный перевод: пропали Nintendo Pro и USB_ |  |
| 781 | `summary_checkbox_xb1_driver` | Enables a built-in USB driver for devices without native Xbox/Nintendo Pro controller support | ~~Включить встроенный USB драйвер для устройств без собственной поддержки контроллеров Xbox~~ → **Включает встроенный USB-драйвер для устройств без собственной поддержки контроллеров Xbox/Nintendo Pro**<br>_неполный: потерян Nintendo Pro; «USB драйвер» без дефиса_ |  |
| 782 | `title_checkbox_usb_bind_all` | Override native Xbox gamepad support | ~~Переопределить поддержку контроллеров Android~~ → **Заменить встроенную поддержку геймпадов Xbox**<br>_смысл потерян: в переводе «контроллеров Android» вместо Xbox_ |  |
| 783 | `summary_checkbox_usb_bind_all` | Use Super Artemis\'s USB driver for all supported gamepads, even if native Xbox/Nintendo Pro controller support is present | ~~Заставляет USB драйвер Super Artemis взять на себя работу со всеми поддерживаемыми Xbox геймпадами~~ → **Использовать USB-драйвер Super Artemis для всех поддерживаемых геймпадов, даже при наличии собственной поддержки контроллеров Xbox/Nintendo Pro**<br>_неполный/устарел: потеряны «даже при наличии собственной поддержки» и Nintendo Pro_ |  |
| 784 | `title_checkbox_mouse_emulation` | Mouse emulation via gamepad | Эмуляция мыши на геймпаде |  |
| 785 | `summary_checkbox_mouse_emulation` | Long-press the Start button to toggle between gamepad and mouse mode | ~~Долгое нажатие кнопки Start переключит геймпад в режим мыши~~ → **Долгое нажатие кнопки Start переключает между режимами геймпада и мыши**<br>_смысл: toggle (туда и обратно), а не только в режим мыши_ |  |
| 786 | `title_checkbox_remember_mouse_mode` | Remember mouse mode | Запоминать режим мыши |  |
| 787 | `summary_checkbox_remember_mouse_mode` | Remember mouse mode selected during stream. When disabled, mouse mode changed during stream will be temporary. | ~~Запоминать выбранный режим мыши во время трансляции. Когда отключено, изменение режима мыши во время трансляции будет временным.~~ → **Запоминать режим мыши, выбранный во время стрима. Если отключено, смена режима мыши во время стрима будет временной.**<br>_термин: «трансляция» → «стрим»_ |  |
| 788 | `title_checkbox_flip_face_buttons` | Flip face buttons | Перевернуть кнопки A/B и X/Y | ⚠ long (17→28 chars) — check layout |
| 789 | `summary_checkbox_flip_face_buttons` | Switches the face buttons A/B and X/Y for gamepads and the on-screen controls | Меняет местами кнопки A/B и X/Y на геймпадах и экранных кнопках |  |
| 790 | `title_checkbox_gamepad_touchpad_as_mouse` | Always control mouse with touchpad | Всегда управлять мышью с помощью тачпада |  |
| 791 | `summary_checkbox_gamepad_touchpad_as_mouse` | Forces gamepad touchpad input to control the host mouse, even when emulating a gamepad with a touchpad. | Заставляет ввод с сенсорной панели геймпада управлять мышью хоста, даже при эмуляции геймпада с помощью тачпада. |  |
| 792 | `title_checkbox_gamepad_motion_sensors` | Allow use of gamepad motion sensors | Разрешить использование датчиков движения геймпада |  |
| 793 | `summary_checkbox_gamepad_motion_sensors` | Enables supported hosts to request motion sensor data when emulating a gamepad with motion sensors. Disabling may slightly reduce power and network usage if motion sensors are not being used in game. | Позволяет поддерживаемым хостам запрашивать данные датчиков движения при эмуляции геймпада с датчиками движения. Отключение может немного снизить энергопотребление и использование сети, если датчики движения не используются в игре. |  |
| 794 | `title_checkbox_gamepad_motion_fallback` | Emulate gamepad motion sensor support | Эмулировать поддержку датчика движения геймпада |  |
| 795 | `summary_checkbox_gamepad_motion_fallback` | Uses your device\'s built-in motion sensors if gamepad sensors are not supported by your connected gamepad or your Android version.\nNote: Enabling this option may cause your gamepad to appear as a PlayStation controller on the host. | ~~Использует встроенные датчики движения вашего устройства, если датчики геймпада не поддерживаются подключенным геймпадом или версией Android. \nПримечание. Включение этой опции может привести к тому, что ваш геймпад будет отображаться на хосте как контроллер PlayStation.~~ → **Использует встроенные датчики движения вашего устройства, если датчики геймпада не поддерживаются подключённым геймпадом или версией Android.\nПримечание: включение этой опции может привести к тому, что ваш геймпад будет отображаться на хосте как контроллер PlayStation.**<br>_ё; «Примечание.» → «Примечание:»; лишний перевод строки в разметке_ |  |
| 796 | `title_checkbox_force_device_motion` | Always use device\'s motion sensors | ~~Всегда использовать датчики движения устройства.~~ → **Всегда использовать датчики движения устройства**<br>_лишняя точка в заголовке_ |  |
| 797 | `summary_checkbox_force_device_motion` | Enforce using devices\'s built-in motion sensor even when the controller reported motion sensors are supported. | Принудительно использовать встроенный в устройство датчик движения, даже если контроллер сообщает о поддержке датчиков движения. |  |
| 798 | `title_enable_rumble` | Enable Rumble | Включить вибрацию |  |
| 799 | `summary_enable_rumble` | Enable rumble feedback on supported gamepads. | ~~"Включить вибрацию на поддерживаемых геймпадах.   "~~ → **Включить вибрацию на поддерживаемых геймпадах.**<br>_лишние пробелы внутри кавычек_ |  |
| 800 | `category_input_settings` | Mouse and touch | ~~Настройки ввода~~ → **Мышь и сенсор**<br>_смысл сужен: «Настройки ввода» вместо мыши и сенсора_ |  |
| 801 | `title_checkbox_touchscreen_trackpad` | Use the touchscreen as a trackpad | Использовать сенсор как тачпад |  |
| 802 | `summary_checkbox_touchscreen_trackpad` | If enabled, the touchscreen acts like a trackpad. If disabled, the touchscreen directly controls the mouse cursor. | ~~Если включено, сенсор выступает в роли тачпада. Если отключено, сенсор напрямую контролирует курсор мыши.~~ → **Если включено, сенсорный экран работает как тачпад. Если отключено, сенсорный экран напрямую управляет курсором мыши.**<br>_калька «контролирует курсор», «выступает в роли»_ |  |
| 803 | `title_checkbox_absolute_mouse_mode` | Remote desktop mouse mode | Режим удалённого рабочего стола для мыши |  |
| 804 | `summary_checkbox_absolute_mouse_mode` | This can make mouse acceleration behave more naturally for remote desktop usage, but it is incompatible with many games. | ~~Может сделать движения мыши естественней для удаленного рабочего стола, но несовместимо с большинством игр.~~ → **Может сделать ускорение мыши более естественным при работе с удалённым рабочим столом, но несовместимо со многими играми.**<br>_искажение: many ≠ «большинство»; потеряно «ускорение»; ё_ |  |
| 805 | `title_checkbox_mouse_nav_buttons` | Enable forward/back mouse buttons | ~~Включить кнопки вперед и назад для мыши~~ → **Включить кнопки мыши «Вперёд» и «Назад»**<br>_ё и порядок слов_ |  |
| 806 | `summary_checkbox_mouse_nav_buttons` | Sends a mouse\'s back and forward buttons to the PC. On a few devices this breaks the right click. | ~~Включение этой опции может привести к неправильной работе правой кнопки мыши на некоторых устройствах~~ → **Передаёт на ПК кнопки мыши «Назад» и «Вперёд». На некоторых устройствах это нарушает работу правой кнопки.**<br>_устарел/неполный: потеряно первое предложение о передаче кнопок «Назад»/«Вперёд»_ |  |
| 807 | `category_on_screen_controls_settings` | On-screen controls | Настройки экранных кнопок |  |
| 808 | `title_checkbox_show_onscreen_controls` | Show on-screen controls | Показывать экранные кнопки |  |
| 809 | `summary_checkbox_show_onscreen_controls` | Show virtual controller overlay on touchscreen | Отображать оверлей виртуального контроллера на сенсорном экране |  |
| 810 | `title_hide_osc_when_has_gamepad` | Hide OSC when using Controller | Скрывать экранные кнопки при использовании контроллера | ⚠ long (30→54 chars) — check layout |
| 811 | `summary_hide_osc_when_has_gamepad` | Hide OSC when a physical controller is connected | Скрывать экранные кнопки при подключённом физическом контроллере |  |
| 812 | `title_checkbox_vibrate_osc` | Enable vibration | Включить вибрацию |  |
| 813 | `summary_checkbox_vibrate_osc` | Vibrates your device to emulate rumble for the on-screen controls | ~~Вибрировать устройство для эмуляции виброотдачи при экранном управлении~~ → **Использовать вибрацию устройства для эмуляции виброотдачи при экранном управлении**<br>_грамматика: «вибрировать устройство»_ |  |
| 814 | `title_only_l3r3` | Only show L3 and R3 | Показывать только L3 и R3 |  |
| 815 | `summary_only_l3r3` | Hide all virtual buttons except L3 and R3 | Скрывать все экранные кнопки кроме L3 и R3 |  |
| 816 | `title_show_guide_button` | Show Guide Button | Показать кнопку Guide |  |
| 817 | `summary_show_guide_button` | Show the guide button on screen | Отобразить кнопку Guide на экране |  |
| 818 | `title_reset_osc` | Clear saved on-screen controls layout | Сбросить схему расположения экранных кнопок |  |
| 819 | `summary_reset_osc` | Resets all on-screen controls to their default size and position | ~~Возвращает все экранные элементы управления к их расположениям по умолчанию~~ → **Возвращает всем экранным элементам управления размер и расположение по умолчанию**<br>_неполный: потерян «размер»_ |  |
| 820 | `dialog_title_reset_osc` | Reset Layout | Сбросить схему |  |
| 821 | `dialog_text_reset_osc` | Are you sure you want to delete your saved on-screen controls layout? | ~~Вы уверены что хотите удалить сохраненную схему расположения кнопок?~~ → **Вы уверены, что хотите удалить сохранённую схему расположения экранных кнопок?**<br>_пропущена запятая; ё; потеряно «экранных»_ |  |
| 822 | `toast_reset_osc_success` | On-screen controls reset to default | Экранные элементы управления возвращены к положениям по умолчанию |  |
| 823 | `title_osc_opacity` | Change opacity of on-screen controls | Изменить прозрачность экранных элементов управления |  |
| 824 | `summary_osc_opacity` | Make the on-screen controls more/less transparent | Сделать экранные кнопки более/менее прозрачными |  |
| 825 | `dialog_title_osc_opacity` | Change opacity | Изменить прозрачность |  |
| 826 | `suffix_osc_opacity` | % | % |  |
| 827 | `category_ui_settings` | Appearance | Настройки интерфейса | ⚠ long (10→20 chars) — check layout |
| 828 | `title_checkbox_enable_pip` | Enable Picture-in-Picture observer mode | Включить просмотр в режиме \"Картинка в картинке\" |  |
| 829 | `summary_checkbox_enable_pip` | Allows the stream to be viewed (but not controlled) while multitasking | ~~Позволяет просматривать трансляцию (но не управлять ей) во время работы в других приложениях~~ → **Позволяет просматривать стрим (но не управлять им) во время работы в других приложениях**<br>_термин: «трансляция» → «стрим», согласование «им»_ |  |
| 830 | `title_language_list` | Language | Язык |  |
| 831 | `summary_language_list` | Language to use for Super Artemis | Язык, который будет использоваться в Super Artemis |  |
| 832 | `title_checkbox_small_icon_mode` | Use small box art | ~~Использовать маленькие иконки~~ → **Маленькие обложки**<br>_box art — обложки, не иконки_ | ⚠ long (17→29 chars) — check layout |
| 833 | `summary_checkbox_small_icon_mode` | Smaller box art in the app grid allows more apps to be visible on screen | ~~Использовать маленькие иконки в сетке для отображения большего числа элементов на экране~~ → **Уменьшенные обложки в сетке приложений позволяют видеть на экране больше приложений**<br>_смысл размыт: потеряны «обложки» и «приложения»_ |  |
| 834 | `category_host_settings` | Host | Настройки хоста | ⚠ long (4→15 chars) — check layout |
| 835 | `title_checkbox_enable_sops` | Optimize game settings | Оптимизировать игровые настройки |  |
| 836 | `summary_checkbox_enable_sops` | Allow GFE to modify game settings for optimal streaming | ~~Разрешить GFE изменять настройки игр для оптимальной трансляции~~ → **Разрешить GFE изменять настройки игр для оптимального стрима**<br>_термин: «трансляция» → «стрим»_ |  |
| 837 | `title_checkbox_host_audio` | Play audio on PC | Проигрывать звук на ПК |  |
| 838 | `summary_checkbox_host_audio` | Play audio from the computer and this device | Проигрывать звук на компьютере и текущем устройстве |  |
| 839 | `category_advanced_settings` | Advanced | Расширенные настройки | ⚠ long (8→21 chars) — check layout |
| 840 | `title_unlock_fps` | Unlock all possible frame rates | ~~Показать неподдерживаемые настройки частоты кадров~~ → **Разблокировать все частоты кадров**<br>_смысл искажён: было «Показать неподдерживаемые настройки…»_ |  |
| 841 | `summary_unlock_fps` | Streaming at 90 or 120 FPS may reduce latency on high-end devices but can cause lag or instability on devices that can\'t support it | ~~Трансляция со скоростью 90 или 120 кадров в секунду может уменьшить задержку на устройствах высокого класса, но может вызвать задержки или сбой на устройствах без поддержки этого функционала~~ → **Стрим с частотой 90 или 120 FPS может уменьшить задержку на мощных устройствах, но вызвать подтормаживания или нестабильность на устройствах, которые это не поддерживают**<br>_термин: «трансляция» → «стрим»; «скорость кадров», «функционал»_ |  |
| 842 | `title_checkbox_reduce_refresh_rate` | Allow refresh rate reduction | Разрешить снижение частоты обновления |  |
| 843 | `summary_checkbox_reduce_refresh_rate` | Lower display refresh rates can save power at the expense of some additional video latency | ~~Сниженная частота обновления может экономить батарею за счет дополнительной задержки видео~~ → **Сниженная частота обновления может экономить батарею за счёт дополнительной задержки видео**<br>_ё_ |  |
| 844 | `title_checkbox_disable_warnings` | Disable warning messages | ~~Отключить сообщения с предупреждениями~~ → **Отключить предупреждения**<br>_длинно_ |  |
| 845 | `summary_checkbox_disable_warnings` | Disable on-screen connection warning messages while streaming | ~~Выключить экранные предупреждения о соединении во время трансляции~~ → **Отключить экранные предупреждения о соединении во время стрима**<br>_термин: «трансляция» → «стрим»_ |  |
| 846 | `title_disable_frame_drop` | Never drop frames | Никогда не пропускать кадры |  |
| 847 | `summary_disable_frame_drop` | May reduce micro-stuttering on some devices, but can increase latency | Может уменьшить микрозависания на некоторых устройствах, но также увеличить задержку |  |
| 848 | `title_video_format` | Change codec settings | Изменить настройки кодека |  |
| 849 | `summary_video_format` | Newer codecs can lower video bandwidth requirements if your device supports them. Codec selections may be ignored if not supported by the host software or GPU. | ~~Новые кодеки могут снизить требования к пропускной способности видео, если ваше устройство их поддерживает. Выбор кодека можно игнорировать, если он не поддерживается ПО хоста или графическим процессором.~~ → **Новые кодеки могут снизить требования к пропускной способности видео, если ваше устройство их поддерживает. Выбор кодека может быть проигнорирован, если он не поддерживается ПО хоста или графическим процессором.**<br>_неверный смысл: «можно игнорировать» вместо «может игнорироваться»_ |  |
| 850 | `title_enable_hdr` | Enable HDR (Experimental) | ~~Включить HDR (Экспериментально)~~ → **Включить HDR (экспериментально)**<br>_регистр пометки_ |  |
| 851 | `summary_enable_hdr` | Stream HDR when the game and PC GPU support it. HDR requires a GPU with HEVC Main 10 encoding support. | ~~Потоковая передача с HDR, когда игра и графический процессор ПК поддерживают эту функцию. Для HDR требуется графический процессор с поддержкой кодирования HEVC Main 10.~~ → **Стрим в HDR, когда игра и графический процессор ПК поддерживают эту функцию. Для HDR требуется графический процессор с поддержкой кодирования HEVC Main 10.**<br>_термин: «потоковая передача» → «стрим»_ |  |
| 852 | `title_full_range` | Force full range video (Experimental) | ~~Принудительное полнодиапазонное видео (Экспериментальное)~~ → **Полный диапазон видео принудительно (экспериментально)**<br>_нескладно, регистр_ |  |
| 853 | `summary_full_range` | This will cause loss of detail in light and dark areas if your device doesn\'t properly display full range video content. | ~~Это приведет к потере детализации в светлых и темных областях, если ваше устройство не отображает видеоконтент в полном диапазоне должным образом.~~ → **Это приведёт к потере детализации в светлых и тёмных областях, если ваше устройство не отображает видеоконтент в полном диапазоне должным образом.**<br>_ё_ |  |
| 854 | `title_prevent_packet_loss` | Prevent Packet Loss | Предотвращать потерю пакетов |  |
| 855 | `summary_prevent_packet_loss` | For devices that have packet loss for unknown reasons, you can try to enable this option. | Для устройств, которые теряют пакеты по неизвестным причинам, можно попробовать включить эту опцию. |  |
| 856 | `title_enable_perf_overlay` | Show performance stats while streaming | ~~Включить отображение статистики~~ → **Показывать статистику производительности во время стрима**<br>_неполный перевод_ |  |
| 857 | `summary_enable_perf_overlay` | Display real-time stream performance information while streaming | ~~Отображение оверлея на экране с информацией о производительности во время трансляции в режиме реального времени~~ → **Показывать во время стрима информацию о его производительности в реальном времени**<br>_термин: «трансляция» → «стрим»; порядок слов_ |  |
| 858 | `title_enable_post_stream_toast` | Show latency message after streaming | ~~Показывать отчёт о задержке после трансляции~~ → **Показывать отчёт о задержке после стрима**<br>_термин «стрим»_ |  |
| 859 | `summary_enable_post_stream_toast` | Display a latency information message after the stream ends | ~~Отобразить сообщение с информацией о задержке после окончания трансляции~~ → **Показывать сообщение с информацией о задержке после окончания стрима**<br>_термин: «трансляция» → «стрим»_ |  |
| 860 | `category_help` | Help | Помощь |  |
| 861 | `title_setup_guide` | Setup guide | Инструкция по настройке | ⚠ long (11→23 chars) — check layout |
| 862 | `summary_setup_guide` | View instructions on how to set up your gaming PC for streaming | ~~Посмотреть инструкцию о том как настроить ваш ПК для стриминга~~ → **Посмотреть инструкцию о том, как настроить ваш игровой ПК для стрима**<br>_пропущена запятая; потерян «игровой»; термин «стрим»_ |  |
| 863 | `title_troubleshooting` | Troubleshooting guide | Руководство по устранению неполадок | ⚠ long (21→35 chars) — check layout |
| 864 | `summary_troubleshooting` | View tips for diagnosing and fixing common streaming issues | ~~Посмотрите советы по обнаружению и устранению проблем~~ → **Посмотреть советы по диагностике и устранению частых проблем со стримом**<br>_неполный: потеряно «common streaming»; наклонение не как у соседних пунктов_ |  |
| 865 | `title_privacy_policy` | Privacy policy | Политика конфиденциальности | ⚠ long (14→27 chars) — check layout |
| 866 | `summary_privacy_policy` | No accounts, no ads, no tracking. What the app stores and who it talks to | ~~Посмотреть политику конфиденциальности Super Artemis~~ → **Без аккаунтов, рекламы и слежки. Что хранит приложение и с кем оно связывается**<br>_устарел: описывает прежний текст «Посмотреть политику…»_ |  |
| 867 | `title_special_key_help` | Custom Keys help | Помощь по пользовательским клавишам | ⚠ long (16→35 chars) — check layout |
| 868 | `summary_special_key_help` | Instructions about how to setup custom special keys | Инструкция по настройке пользовательских спец-клавиш |  |
| 869 | `summary_performance_link` | See performance of other devices.\nPlease note, these data are managed by the community, it is not managed by Artemis and does not represent Artemis officially. | ~~Просмотреть производительность других устройств.\nОбратите внимание, эти данные поддерживаются сообществом, они не поддерживаются Artemis и не представляют Artemis официально.~~ → **Посмотреть производительность других устройств.\nОбратите внимание: эти данные ведёт сообщество, а не Artemis, и они не являются официальными данными Artemis.**<br>_пунктуация: после «Обратите внимание» нужно двоеточие; калька «не представляют Artemis официально»_ |  |
| 870 | `title_performance_link` | Performance Dashboard | Панель производительности |  |
| 871 | `toast_controller_type_changed` | Gamepad type may be changed due to motion sensor emulation | ~~Тип геймпада может быть изменен из-за эмуляции датчика движения~~ → **Тип геймпада может быть изменён из-за эмуляции датчика движения**<br>_ё_ |  |
| 872 | `resolution_360p` | 360p | 360p |  |
| 873 | `resolution_480p` | 480p | 480p |  |
| 874 | `resolution_720p` | 720p | 720p |  |
| 875 | `resolution_1080p` | 1080p | 1080p |  |
| 876 | `resolution_1440p` | 1440p | 1440p |  |
| 877 | `resolution_4k` | 4K | 4K |  |
| 878 | `fps_30` | 30 FPS | 30 FPS | ⚠ identical to English |
| 879 | `fps_60` | 60 FPS | 60 FPS | ⚠ identical to English |
| 880 | `fps_90` | 90 FPS | 90 FPS | ⚠ identical to English |
| 881 | `fps_120` | 120 FPS | 120 FPS | ⚠ identical to English |
| 882 | `audioconf_stereo` | Stereo | Стерео |  |
| 883 | `audioconf_51surround` | 5.1 Surround Sound | 5.1 Объёмный звук |  |
| 884 | `audioconf_71surround` | 7.1 Surround Sound | 7.1 Объёмный звук |  |
| 885 | `videoformat_auto` | Automatic (Recommended) | ~~Автоматически (Рекомендовано)~~ → **Автоматически (рекомендуется)**<br>_регистр и форма_ |  |
| 886 | `videoformat_av1always` | Prefer AV1 (Experimental) | ~~Предпочитать AV1 (Экспериментальный)~~ → **Предпочитать AV1 (экспериментально)**<br>_форма и регистр пометки_ |  |
| 887 | `videoformat_hevcalways` | Prefer HEVC | Предпочитать HEVC |  |
| 888 | `videoformat_h264always` | Prefer H.264 | Предпочитать H.264 |  |
| 889 | `title_frame_pacing` | Video frame pacing | ~~Скорость вывода/отрисовки кадра~~ → **Вывод кадров**<br>_«Скорость вывода/отрисовки кадра» — неверно: настройка управляет синхронизацией вывода, не скоростью_ | ⚠ long (18→31 chars) — check layout |
| 890 | `summary_frame_pacing` | Specify how to balance video latency and smoothness | Укажите, как сбалансировать задержку и плавность видеосигнала |  |
| 891 | `pacing_warp` | Warp Drive (Experimental) | Warp Drive (экспериментально) |  |
| 892 | `pacing_warp2` | Warp 2 (Experimental) | Warp 2 (экспериментально) |  |
| 893 | `pacing_latency` | Prefer lowest latency | ~~Предпочтительна наименьшая задержка~~ → **Минимальная задержка**<br>_«Предпочтительна наименьшая задержка» — нескладно_ | ⚠ long (21→35 chars) — check layout |
| 894 | `pacing_balanced` | Balanced | Сбалансированно | ⚠ long (8→15 chars) — check layout |
| 895 | `pacing_balanced_alt` | Balanced with FPS limit | Сбалансированно с лимитом FPS |  |
| 896 | `pacing_smoothness` | Prefer smoothest video (may significantly increase latency) | ~~Предпочтительно наиболее плавное видео (может значительно увеличить задержку)~~ → **Максимально плавное видео (может значительно увеличить задержку)**<br>_калька «Предпочтительно…»; согласовано с «Минимальная задержка»_ |  |
| 897 | `keyboard_service_label` | Super Artemis Physical keyboard | Физическая клавиатура Super Artemis |  |
| 898 | `accessibility_description_text` | Only used when physical keyboard shortcut were intercepted by system. In some systems, several keyboard shortcut are defind and used by the Android system, causing them not being able to be passed through to the host PC. Super Artemis will not look through your input, nor collecting your password, credit card number or any other private information. | ~~Используется, если системные сочетания физической клавиатуры перехватываются Android. В таких случаях некоторые сочетания не проходят на хост-ПК. Super Artemis не просматривает ваш ввод и не собирает пароли, номера карт или другую личную информацию.~~ → **Используется, только если системные сочетания физической клавиатуры перехватываются Android. В таких случаях некоторые сочетания не проходят на хост-ПК. Super Artemis не просматривает ваш ввод и не собирает пароли, номера карт или другую личную информацию.**<br>_неполный: потеряно «только»_ |  |
| 899 | `game_menu_toggle_keyboard` | Show soft keyboard | Показать экранную клавиатуру |  |
| 900 | `game_menu_toggle_hud` | Toggle Performance Overlay | Вкл./выкл. панель производительности |  |
| 901 | `game_menu_toggle_floating_button` | Toggle Floating Button | Вкл./выкл. плавающую кнопку |  |
| 902 | `game_menu_select_mouse_mode` | Select Mouse mode | Выбрать режим мыши |  |
| 903 | `game_menu_select_steam_mode` | Select Stream mode | Выбрать режим стрима |  |
| 904 | `game_menu_enable_zoom_mode` | Enable Pan/Zoom | Включить прокрутку/масш. |  |
| 905 | `game_menu_disable_zoom_mode` | Disable Pan/Zoom | Выключить прокрутку/масш. |  |
| 906 | `game_menu_rotate_screen` | Rotate Screen | Повернуть экран |  |
| 907 | `game_menu_toggle_keyboard_model` | Toggle Special keys | Вкл./выкл. спец-клавиши |  |
| 908 | `game_menu_toggle_virtual_model` | Toggle On-screen controller | Вкл./выкл. экранный контроллер |  |
| 909 | `game_menu_toggle_virtual_keyboard_model` | Toggle On-screen full keyboard | Вкл./выкл. полноэкранную клавиатуру |  |
| 910 | `game_menu_switch_touch_sensitivity_model` | Switch touch sensitivity | Изменить чувствительность касаний |  |
| 911 | `game_menu_toggle_mouse_on` | Enable Controller Mouse Emulation | Включить эмуляцию мыши контроллером |  |
| 912 | `game_menu_toggle_mouse_off` | Disable Controller Mouse Emulation | Отключить эмуляцию мыши контроллером |  |
| 913 | `game_menu_disconnect` | Disconnect | Отключиться |  |
| 914 | `game_menu_cancel` | Cancel | Отмена |  |
| 915 | `game_menu_task_manager` | Open Task Manager | Открыть диспетчер задач |  |
| 916 | `game_menu_send_keys` | Send special keys | Отправить спец-клавиши |  |
| 917 | `game_menu_send_keys_shift_tab` | Shift + Tab (Steam Overlay) | Shift + Tab (панель Steam) |  |
| 918 | `game_menu_send_keys_win_shift_left` | Win + shift + left (Move app between Desktops) | ~~Win + Shift + Left (переместить приложение между рабочими столами)~~ → **Win + shift + left (Переместить приложение между рабочими столами)**<br>_правило владельца: клавиши — точно как в оригинале, переводится только пояснение_ |  |
| 919 | `game_menu_send_keys_ctrl_alt_shift_q` | Ctrl+Alt+Shift+Q (PC Exit Streaming) | Ctrl+Alt+Shift+Q (выход из стрима на ПК) |  |
| 920 | `game_menu_send_keys_ctrl_alt_shift_f1` | Ctrl+Alt+Shift+F1 (Switch Monitor) | Ctrl+Alt+Shift+F1 (смена монитора) |  |
| 921 | `game_menu_send_keys_ctrl_alt_shift_f12` | Ctrl+Alt+Shift+F12 (Switch Monitor) | Ctrl+Alt+Shift+F12 (смена монитора) |  |
| 922 | `toggle_pan_zoom_mode` | Toggle Pan/Zoom Mode | Переключить режим прокрутки/масш. | ⚠ long (20→33 chars) — check layout |
| 923 | `pan_zoom_mode_enabled` | Pan/Zoom Mode Enabled | Режим прокрутки/масш. включён |  |
| 924 | `pan_zoom_mode_disabled` | Pan/Zoom Mode Disabled | Режим прокрутки/масш. выключен |  |
| 925 | `title_analog_scrolling` | Use an analog stick to scroll | Использовать аналоговый джойстик для прокрутки |  |
| 926 | `summary_analog_scrolling` | Select an analog stick to scroll when in mouse emulation mode | Выбрать аналоговый джойстик для прокрутки в режиме эмуляции мыши |  |
| 927 | `analogscroll_none` | None (both sticks move the mouse) | Нет (оба джойстика перемещают мышь) |  |
| 928 | `analogscroll_right` | Right analog stick | Правый аналоговый джойстик |  |
| 929 | `analogscroll_left` | Left analog stick | Левый аналоговый джойстик |  |
| 930 | `perf_overlay_lite_net` | %1$dms | %1$dмс |  |
| 931 | `perf_overlay_lite_dectime` | %1$.2fms | %1$.2fмс |  |
| 932 | `perf_overlay_ai_delegate` | Delegate: | Делегат: |  |
| 933 | `perf_overlay_lite_decoder` | Decoder: %1$s | Декодер: %1$s |  |
| 934 | `title_import_keyboard_layout` | Import keyboard layout | Импорт раскладки клавиатуры |  |
| 935 | `title_export_keyboard_layout` | Export keyboard layout | Экспорт раскладки клавиатуры |  |
| 936 | `summary_import_keyboard_layout` | This will overwrite the current layout. | Это перезапишет текущую раскладку. |  |
| 937 | `summary_export_keyboard_layout` | Export the current keyboard layout | ~~Экспорт текущей раскладки.~~ → **Экспорт текущей раскладки клавиатуры**<br>_лишняя точка, неполный_ |  |
| 938 | `title_manual_enter_bitrate` | Custom bitrate | Пользовательский битрейт | ⚠ long (14→24 chars) — check layout |
| 939 | `summary_manual_enter_bitrate` | Enter bitrate manually.\nCan exceed the maximum range of the seekbar. | Ввести битрейт вручную.\nМожет превышать пределы ползунка. |  |
| 940 | `dialog_manual_enter_bitrate` | Enter bitrate in Mbps. Round to 0.5. | ~~Введите битрейт в Мбит/с. Округлять до 0.5.~~ → **Введите битрейт в Мбит/с, с шагом 0,5.**<br>_в русском десятичная запятая_ |  |
| 941 | `title_custom_refresh_rate` | Custom refresh rate | Пользовательская частота обновления | ⚠ long (19→35 chars) — check layout |
| 942 | `summary_custom_refresh_rate` | Enter refresh rate manually. Only supports Apollo. | Введите частоту вручную. Поддерживается только Apollo. |  |
| 943 | `dialog_custom_refresh_rate` | Enter refresh rate in Hz. Can be fractional. | Введите частоту в Гц. Может быть дробной. |  |
| 944 | `title_render_mode` | Render Mode | Режим рендеринга |  |
| 945 | `title_render_mode_convergence_title` | 3D Convergence | 3D конвергенция |  |
| 946 | `title_render_mode_convergence_description` | Reference: 50 - Balanced / 0: InFrontOfScreen /  100 - BehindOfScreen | ~~Справка: 50 - Сбалансировано / 0: Перед экраном / 100 - За экраном~~ → **Ориентир: 50 — сбалансировано / 0 — перед экраном / 100 — за экраном**<br>_смысл: Reference — ориентировочное значение, а не «Справка»; дефис вместо тире_ |  |
| 947 | `title_render_mode_balance_shift_title` | 3D Eye Balance | Баланс глаз 3D |  |
| 948 | `title_render_mode_balance_shift_description` | Reference: 50 - Both eyes share 50% depth far/pop depth effect / 0: Left (100% Pop) - Right (100% Far) /  100 - Left Far - Right Pop // 100 or 0 provide best sharpness as one pixel always exist unshifted on the other eye  | ~~Справка: 50 - Оба глаза делят эффект глубины 50/50 (объём/удаление) / 0: Левый (100% Объём) - Правый (100% Удаление) / 100: Левый Удаление - Правый Объём // Значения 100 или 0 обеспечивают максимальную чёткость, так как один пиксель остаётся неизменным для другого глаза~~ → **Ориентир: 50 — оба глаза делят эффект глубины 50/50 (объём/удаление) / 0 — левый 100% объём, правый 100% удаление / 100 — левый удаление, правый объём // Значения 100 или 0 обеспечивают максимальную чёткость, так как один пиксель остаётся неизменным для другого глаза**<br>_смысл: Reference — ориентировочное значение, а не «Справка»; дефис вместо тире, лишние заглавные_ |  |
| 949 | `title_render_mode_strength_title` | 3D Effect Strength | Сила 3D-эффекта |  |
| 950 | `title_render_mode_strength_description` | Reference: 50 - Higher more effect, but maybe strain on eyes and unnatural. Lower, easier on eyes and smoother expierence. | ~~Справка: 50 - Выше значение: эффект выраженнее, но возможна нагрузка на глаза и неестественное изображение. Ниже значение: комфорт для глаз и более плавное восприятие.~~ → **Ориентир: 50. Чем выше, тем сильнее эффект, но возможны усталость глаз и неестественная картинка. Чем ниже, тем легче для глаз и плавнее восприятие.**<br>_смысл: Reference — ориентировочное значение, а не «Справка»; дефис вместо тире, корявые «Выше значение:»_ |  |
| 951 | `title_touchscreen_mode` | Touchscreen Mode | Режим сенсора |  |
| 952 | `summary_render_mode` | Default 2D or SBS 3D. 3D will simply double your width and add the effect automatically, no setup required. AI 2D to 3D conversion  | По умолчанию 2D или SBS 3D. В режиме 3D ширина изображения будет автоматически удвоена с добавлением эффекта, настройка не требуется. Преобразование 2D в 3D с помощью ИИ. |  |
| 953 | `summary_touchscreen_mode` | How touches control the PC: multi-touch, absolute touch, trackpad or disabled. A pen or stylus still works when touch is disabled, and an external display always uses Track pad (natural). | ~~Выберите режим Мультитач / Одиночное касание / Трекпад / Выключено.\nПеро/стилус остаются работоспособны при Выключено.\nНа внешнем дисплее принудительно Трекпад (Natural).~~ → **Как касания управляют ПК: мультитач, абсолютный ввод, трекпад или выключено. Перо или стилус работают и при выключенном сенсоре, а на внешнем дисплее всегда используется «Трекпад (Natural)».**<br>_устарел: описывал старый текст с «Одиночное касание» и лишними переносами строк_ | ⚠ \n count differs |
| 954 | `title_checkbox_mouse_local_cursor` | Use local mouse cursor | Использовать локальный курсор мыши |  |
| 955 | `summary_checkbox_mouse_local_cursor` | Shows the Android cursor instead of capturing a physical mouse. During a stream, Ctrl+Alt+Shift+C switches the cursor on or off, Ctrl+Alt+Shift+Z releases or grabs the mouse, and Ctrl+Alt+Shift+Q ends the stream. | ~~Захватывается внешний курсор физической мыши. Данная опция позволяет отображать системный курсор Android.~~ → **Показывает курсор Android вместо захвата физической мыши. Во время стрима Ctrl+Alt+Shift+C включает и выключает курсор, Ctrl+Alt+Shift+Z отпускает или захватывает мышь, а Ctrl+Alt+Shift+Q завершает стрим.**<br>_устарел: нет сочетаний клавиш, смысл искажён («захватывается внешний курсор»)_ |  |
| 956 | `title_checkbox_multi_touch_gestures` | Enable multi-touch gestures | Включить мультитач-жесты |  |
| 957 | `summary_checkbox_multi_touch_gestures` | Enable 3 finger tap for keyboard, 4 finger tap for full keyboard, 5 finger tap for quick menu when using multi-touch mode. | ~~Включить жест с 3 пальцами для клавиатуры, 4 пальцами для полной клавиатуры, 5 пальцами для быстрого меню при использовании режима мультитач.~~ → **Включить касание 3 пальцами для клавиатуры, 4 пальцами — для полной клавиатуры, 5 пальцами — для быстрого меню в режиме мультитач.**<br>_смысл потерян: tap — касание, а не «жест»_ |  |
| 958 | `title_checkbox_onscreen_style_official` | Official Virtual Gamepad Skin | Официальная тема виртуального геймпада |  |
| 959 | `summary_checkbox_onscreen_style_official` | If you still like the old style of official virtual gamepad buttons, you can select this option.\nButton shapes can be square if you selected the bottom virtual button [Normal buttons are square buttons] | ~~Выберите этот вариант, если предпочитаете старый стиль виртуального геймпада. Форма кнопок может быть квадратной при выборе нижней виртуальной кнопки [Обычные кнопки - квадратные]~~ → **Выберите этот вариант, если вам по-прежнему нравится старый стиль официальных кнопок виртуального геймпада.\nФорма кнопок может быть квадратной, если выбран нижний пункт виртуальных кнопок [Обычные кнопки — квадратные]**<br>_неполный: потеряны «официальных» и перенос строки; дефис вместо тире_ | ⚠ \n count differs |
| 960 | `title_checkbox_enable_perf_overlay_lite` | Enable Lite mode | Включить упрощённый режим |  |
| 961 | `summary_checkbox_enable_perf_overlay_lite` | Display simplified performance information: Network Speed / Latency / Decode / Packet Loss Rate / FPS | ~~Отображать упрощённую информацию: скорость сети / задержка / декодирование / потеря пакетов / FPS~~ → **Отображать упрощённую информацию о производительности: скорость сети / задержка / декодирование / потеря пакетов / FPS**<br>_неполный: потеряно «о производительности»_ |  |
| 962 | `title_checkbox_enable_perf_logging` | Enable Performance Logging | Включить логирование производительности |  |
| 963 | `summary_checkbox_enable_perf_logging` | "Stores performance data per configuration. (Offline only) " | Сохраняет данные производительности по конфигурациям (только офлайн) |  |
| 964 | `title_checkbox_enable_perf_overlay_lite_dialog` | Lite mode click to pop up quick options | ~~В упрощенном режиме нажмите, чтобы открыть быстрые опции.~~ → **В упрощённом режиме нажатие открывает быстрые опции**<br>_ё, лишняя точка_ |  |
| 965 | `summary_checkbox_enable_perf_overlay_lite_dialog` | Replace the back button logic, pop up the game quick menu. | ~~Заменяет логику кнопки Back, открывая быстрое меню игры.~~ → **Заменяет действие кнопки «Назад»: открывается быстрое меню.**<br>_термин: кнопка «Назад», не Back_ |  |
| 966 | `title_show_overlay_zoom_toggle_button` | Show overlay zoom toggle button | Показать кнопку переключения масш. панели |  |
| 967 | `summary_show_overlay_zoom_toggle_button` | Displays a draggable button at the top of the screen to toggle pan/zoom mode. | ~~Показывает перетаскиваемую кнопку вверху экрана для переключения прокрутки/масш.~~ → **Показывает перетаскиваемую кнопку вверху экрана для переключения режима прокрутки и масштабирования.**<br>_сокращение «масш.» в описании, потеряно «режима»_ |  |
| 968 | `title_virtual_trackpad_settings` | Virtual trackpad | Настройки виртуального трекпада | ⚠ long (16→31 chars) — check layout |
| 969 | `title_quit_dialog` | Back Menu | ~~Быстрое меню~~ → **Меню по кнопке «Назад»**<br>_имя «Быстрое меню» занято Quick Menu; настройка — меню по кнопке «Назад»_ | ⚠ long (9→22 chars) — check layout |
| 970 | `summary_quit_dialog` | The back button during a stream opens a menu with the soft keyboard, performance overlay, touch mode and special keys. | ~~При включении нажатие физической кнопки Back в интерфейсе стрима покажет связанные опции!\nЭкранная клавиатура, инфо о производительности, переключение режима ввода, отправка спец-клавиш~~ → **Кнопка «Назад» во время стрима открывает меню: экранная клавиатура, панель производительности, режим касаний и спец-клавиши.**<br>_перевод устарел: описывал прежний английский текст, с «!» и лишним переносом_ | ⚠ \n count differs |
| 971 | `title_floating_button` | Floating menu button | Плавающая кнопка |  |
| 972 | `summary_floating_button` | A small button over the stream that opens the Quick Menu, even with Back Menu off | ~~Включить плавающую кнопку~~ → **Небольшая кнопка поверх стрима, открывающая быстрое меню, даже если меню по кнопке «Назад» выключено**<br>_устарел: «Включить плавающую кнопку» не описывает текущий английский_ |  |
| 973 | `dialog_custom_resolution` | The new resolution applies when you leave Settings. | ~~Установите разрешение и выйдите из настроек для применения!~~ → **Новое разрешение применится после выхода из настроек.**<br>_устарел: описывал старый текст-приказ; лишний «!»_ |  |
| 974 | `summary_custom_resolution` | Add a custom resolution, separated by x, strange resolutions may not work.\nFor example: 1920x1080\nIf it is a non-native resolution, it may not fill the notch area by default. If the aspect ratio is the same, you can manually set to stretch the screen to fill the full screen | ~~Добавьте пользовательское разрешение, разделённое знаком X, нестандартные разрешения могут не работать.\nНапример: 1920×1080\nЕсли разрешение не является нативным, оно по умолчанию может не заполнять область выреза. Если соотношение сторон совпадает, вы можете вручную настроить растягивание экрана на полный экран~~ → **Добавьте пользовательское разрешение, разделив ширину и высоту знаком x; нестандартные разрешения могут не работать.\nНапример: 1920x1080\nЕсли разрешение не является нативным, оно по умолчанию может не заполнять область выреза. Если соотношение сторон совпадает, вы можете вручную настроить растягивание экрана на полный экран**<br>_смысл: в примере знак умножения «×» и заглавная «X» вместо вводимой латинской x_ |  |
| 975 | `title_custom_resolution` | Custom Resolution | Пользовательское разрешение |  |
| 976 | `title_auto_orientation` | Auto Orientation | Авто-ориентация |  |
| 977 | `summary_auto_orientation` | The streaming screen will be displayed according to the device\'s orientation when the stream begins. | ~~Экран стрима будет соответствовать ориентации устройства при запуске.~~ → **Экран стрима будет соответствовать ориентации устройства в момент начала стрима.**<br>_неточно: «при запуске» читается как запуск приложения_ |  |
| 978 | `title_import_special_button` | Import Custom Keys | Импорт пользовательских клавиш | ⚠ long (18→30 chars) — check layout |
| 979 | `summary_import_special_button` | Available in Back Menu and special keys.\nNote: Importing will overwrite current configuration, please backup accordingly. | ~~Доступно в меню Back меню и спец-клавишах.\nВнимание: импорт перезапишет текущую конфигурацию - сделайте резервную копию.~~ → **Доступно в меню по кнопке «Назад» и в спец-клавишах.\nВнимание: импорт перезапишет текущую конфигурацию — сделайте резервную копию.**<br>_опечатка: «меню Back меню»; термин: меню по кнопке «Назад»; дефис вместо тире_ |  |
| 980 | `summary_share_performance_logs` | Share your performance with friends or the community | Поделиться данными о производительности с друзьями/сообществом |  |
| 981 | `title_share_performance_logs_button` | Share Performance Logs | Поделиться логами производительности | ⚠ long (22→36 chars) — check layout |
| 982 | `title_software_update` | Software Update | Обновление ПО |  |
| 983 | `title_follow_update` | Follow updates with Obtainium | ~~Следить за обновлениями~~ → **Следить за обновлениями через Obtainium**<br>_неполный перевод: пропал Obtainium_ |  |
| 984 | `summary_follow_update` | One tap adds Super Artemis to Obtainium, which alerts you to every new release | ~~Следите за обновлениями Super Artemis через Obtainium~~ → **Одним касанием добавляет Super Artemis в Obtainium, который сообщает о каждом новом релизе**<br>_устарел: описывал старый текст_ |  |
| 985 | `title_special_key_layout` | Virtual keys on screen | Раскладка спец-клавиш |  |
| 986 | `title_show_virtual_key` | Display virtual keys on screen | Показать виртуальные клавиши на экране |  |
| 987 | `summary_show_virtual_key` | Display a layer of virtual special keys on the touchscreen.\nKey opacity is shared with the virtual gamepad above. | Отобразить слой виртуальных спец-клавиш на тачскрине.\nНепрозрачность клавиш общая с виртуальным геймпадом. |  |
| 988 | `title_default_layout_scheme` | Default layout profile | Профиль раскладки по умолчанию |  |
| 989 | `summary_default_layout_scheme` | Each layout profile is initially the same (generated based on the keyboards.json file), you can delete and adjust it yourself | Каждый профиль раскладки изначально одинаков (создаётся на основе файла keyboards.json), вы можете удалить его и настроить самостоятельно |  |
| 990 | `summary_vibrate_keyboard` | When you click the screen button, it will trigger the phone motor vibration. This option can also be used for virtual gamepad buttons. | При нажатии экранной кнопки срабатывает вибрация телефона. Опция также действует на виртуальные кнопки геймпада |  |
| 991 | `title_square_buttons` | Normal buttons are square buttons | Квадратные кнопки |  |
| 992 | `summary_square_buttons` | Virtual button shapes are square buttons, by default they are round. | Форма виртуальных кнопок квадратная, по умолчанию круглая |  |
| 993 | `title_reset_keyboard_layout` | Reset virtual keyboard layout | Сбросить раскладку виртуальной клавиатуры |  |
| 994 | `summary_reset_keyboard_layout` | Initialize the special key layout (reset the default selected layout scheme) | Инициализировать раскладку спец-клавиш (сброс на схему по умолчанию) |  |
| 995 | `title_joyconfix` | Compatible with Switch JoyCon | Совместимость с Switch JoyCon |  |
| 996 | `summary_joyconfix` | If your JoyCon cannot be used or has key recognition issues, you can try to enable this feature. Adapted for Android 10 and above | ~~Если JoyCon не работает или есть проблемы с распознаванием, включите эту опцию. Адаптировано для Android 10+~~ → **Если JoyCon не работает или неверно распознаёт кнопки, попробуйте включить эту опцию. Адаптировано для Android 10+**<br>_неточно: потеряны «попробуйте» и «распознавание кнопок»_ |  |
| 997 | `title_keyboard_opacity` | Virtual Full Keyboard Opacity | Непрозрачность виртуальной клавиатуры |  |
| 998 | `title_onscreen_keyboard_autofit` | Virtual Full Keyboard Disable Autofit | Отключить авто-подгон виртуальной клавиатуры |  |
| 999 | `title_onscreen_keyboard_height` | Virtual Full Keyboard Height | Высота виртуальной клавиатуры |  |
| 1000 | `title_onscreen_keyboard_width` | Virtual Full Keyboard Width | Ширина виртуальной клавиатуры |  |
| 1001 | `title_onscreen_keyboard_align_mode` | Virtual Full Keyboard Align Mode | Режим выравнивания виртуальной клавиатуры |  |
| 1002 | `summary_onscreen_keyboard_height` | Adjust the height of the virtual full keyboard | ~~Настроить высоту полноэкранной клавиатуры~~ → **Настроить высоту виртуальной полной клавиатуры**<br>_смысл: full keyboard — полная, а не «полноэкранная»_ |  |
| 1003 | `summary_onscreen_keyboard_autofit` | Dont adjust the size and position of the keyboard automatically and allows custom size  | Не изменять автоматически размер и позицию клавиатуры и разрешить пользовательский размер |  |
| 1004 | `summary_onscreen_keyboard_width` | Adjust the width of the virtual full keyboard | Настроить ширину клавиатуры |  |
| 1005 | `summary_onscreen_keyboard_align_mode` | How the virtual full keyboard aligns to the view port | Как клавиатура выравнивается в области просмотра |  |
| 1006 | `title_free_analog_stick` | Free Analog Stick | Свободный аналоговый стик |  |
| 1007 | `summary_free_analog_stick` | Virtual gamepad left and right stick center point positions are not fixed, can be freely adjusted within a certain range of movement. | ~~Центры левого и правого стика не фиксированы можно свободно корректировать в пределах допустимого хода~~ → **Центры левого и правого стиков виртуального геймпада не фиксированы: их можно свободно смещать в пределах допустимого хода.**<br>_пропущен знак препинания; потеряно «виртуального геймпада»_ |  |
| 1008 | `summary_free_analog_stick_opacity` | By default, only when the stick moves, the background is displayed. If you don\'t like it, you can adjust the opacity effect. | ~~По умолчанию фон отображается только при движении стика. Если вам это не нравится можно изменить прозрачность~~ → **По умолчанию фон отображается только при движении стика. Если вам это не нравится, можно изменить прозрачность.**<br>_пропущена запятая_ |  |
| 1009 | `title_free_analog_stick_opacity` | Free Analog Stick Background Opacity | Непрозрачность фона свободного стика |  |
| 1010 | `title_exdisplay_mode` | External Display Mode (Beta) | Режим внешнего дисплея (бета) |  |
| 1011 | `title_fullexdisplay_mode` | Fully External Display Mode (Beta) | Полный режим внешнего дисплея (бета) |  |
| 1012 | `summary_exdisplay_mode` | Stream display on the monitor, virtual buttons and performance information and other controls on the phone screen. | ~~Картинка на мониторе, виртуальные кнопки и статистика на экране телефона.~~ → **Изображение стрима — на мониторе, а виртуальные кнопки, данные о производительности и другие элементы управления — на экране телефона.**<br>_неполный: потеряны «и другие элементы управления»_ |  |
| 1013 | `summary_fullexdisplay_mode` | Allows full immersive secondary screen mode with automatically matched refresh rate and resolution. Manual settings won\'t apply in this mode. | Полноценный второй экран с автоматическим подбором частоты и разрешения. Ручные настройки не применяются. |  |
| 1014 | `title_top_center_display` | Display in Top Center | Отображать вверху по центру |  |
| 1015 | `summary_top_center_display` | Streaming picture will be aligned to the top of the screen instead of centered when resolution is not native. | ~~При ненативном разрешении изображение будет выравнено по верхнему краю экрана вместо центрирования.~~ → **При ненативном разрешении изображение будет выровнено по верхнему краю экрана вместо центрирования.**<br>_опечатка: «выравнено»_ |  |
| 1016 | `title_touch_sensitivity` | Touch Screen Sensitivity | Чувствительность сенсора |  |
| 1017 | `summary_touch_sensitivity` | When enabled, you can manually adjust the touch sensitivity. | При включении можно вручную регулировать чувствительность касаний |  |
| 1018 | `title_global_touch_sensitivity` | Touch Screen Sensitivity Global Effect | Глобальный эффект чувствительности сенсора |  |
| 1019 | `summary_global_touch_sensitivity` | Off: the custom sensitivity applies to the right half of the screen only, for games that steer the camera there. On: it applies to the whole screen. | ~~По умолчанию не выбрано, действует только на правую половину экрана (подходит для игры Genshin Impact), при выборе действует на весь экран.~~ → **Выкл.: заданная чувствительность действует только на правую половину экрана — для игр, где там управляют камерой. Вкл.: действует на весь экран.**<br>_устарел: описывал старый текст с Genshin Impact_ |  |
| 1020 | `title_auto_touch_sensitivity` | Automatically return to screen center when touch coordinates exceed boundary | Автоматический возврат в центр экрана при выходе координат за границы |  |
| 1021 | `summary_auto_touch_sensitivity` | With a high sensitivity a short swipe can hit the screen edge and stop the pointer. This moves the pointer back to the center when that happens. | ~~При высокой чувствительности небольшое движение может выйти за границы, из-за чего невозможно будет перемещаться, вы можете выбрать эту опцию.~~ → **При высокой чувствительности короткий свайп может упереться в край экрана и остановить указатель. В этом случае опция возвращает указатель в центр.**<br>_устарел: описывал старый текст, не объяснял действие опции_ |  |
| 1022 | `title_touch_sensitivity_x` | Screen Sensitivity Adjustment X Axis | Регулировка чувствительности по X |  |
| 1023 | `summary_touch_sensitivity_x` | Multi-touch mode, when playing games, some games may not meet the sensitivity adjustment needs, you can use this option to modify the sensitivity of the field of view. | ~~В мультитач режиме некоторые игры требуют иной чувствительности - используйте эту опцию для настройки чувствительности поля обзора.~~ → **В режиме мультитач некоторые игры требуют иной чувствительности — используйте эту опцию для настройки чувствительности поля обзора.**<br>_калька «мультитач режим»; дефис вместо тире_ |  |
| 1024 | `title_touch_sensitivity_y` | Screen Sensitivity Adjustment Y Axis | Регулировка чувствительности по Y |  |
| 1025 | `summary_touch_sensitivity_y` | Multi-touch mode, when playing games, some games may not meet the sensitivity adjustment needs, you can use this option to modify the sensitivity of the field of view. | ~~В мультитач режиме некоторые игры требуют иной чувствительности - используйте эту опцию для настройки чувствительности поля обзора.~~ → **В режиме мультитач некоторые игры требуют иной чувствительности — используйте эту опцию для настройки чувствительности поля обзора.**<br>_калька «мультитач режим»; дефис вместо тире_ |  |
| 1026 | `title_debug_info` | Debug Info | Отладочная информация | ⚠ long (10→21 chars) — check layout |
| 1027 | `summary_debug_info` | Test gamepad vibration and other stuff. | Тест вибрации геймпада и прочее. |  |
| 1028 | `title_touchpad_sensitivity_x` | Touchpad Sensitivity X Axis | Чувствительность трекпада по X |  |
| 1029 | `summary_touchpad_sensitivity_x` | Horizontal speed of the trackpad touch mode and the virtual trackpad key. Both use this value. | ~~Для режима мыши/тачпада и управления виртуальными специальными кнопками тачпада.\nОба используют одно значение чувствительности, но поведение может отличаться.\nКто-нибудь использует их одновременно?~~ → **Скорость по горизонтали для режима касаний «Трекпад» и виртуальной клавиши трекпада. Оба используют это значение.**<br>_устарел: описывал старый текст с лишними строками («Кто-нибудь использует их одновременно?»)_ | ⚠ \n count differs |
| 1030 | `title_touchpad_sensitivity_y` | Touchpad Sensitivity Y Axis | Чувствительность трекпада по Y |  |
| 1031 | `summary_touchpad_sensitivity_y` | Vertical speed of the trackpad touch mode and the virtual trackpad key. Both use this value. | ~~Для режима мыши/тачпада и управления виртуальными специальными кнопками через тачпад.~~ → **Скорость по вертикали для режима касаний «Трекпад» и виртуальной клавиши трекпада. Оба используют это значение.**<br>_устарел: описывал старый текст, нет «по вертикали»_ |  |
| 1032 | `title_device_rumble` | Force vibration on device | Принудительно включить вибрацию устройства | ⚠ long (25→42 chars) — check layout |
| 1033 | `summary_device_rumble` | If you are not satisfied with the vibration of the connected gamepad, you can enable this option.\nInvalid for forced use of Super Artemis\'s built-in USB driver | Если вас не устраивает вибрация подключённого геймпада, вы можете включить эту опцию.\nНедоступно при принудительном использовании встроенного USB-драйвера Super Artemis |  |
| 1034 | `title_clear_default_special_button` | Disable default Special Keys | Отключить стандартные спец-клавиши |  |
| 1035 | `summary_clear_default_special_button` | If you feel the built-in commands in the Back Menu are useless, you can disable them and use your imported ones. | ~~Если встроенные команды в меню Back не нужны отключите их и используйте импортированные~~ → **Если встроенные команды в меню по кнопке «Назад» не нужны, отключите их и используйте импортированные**<br>_пропущена запятая; термин: меню по кнопке «Назад»_ |  |
| 1036 | `title_trackpad_sensitivity_x` | Trackpad Sensitivity X | Чувствительность трекпада по X |  |
| 1037 | `summary_trackpad_sensitivity_x` | Horizontal trackpad speed. A negative value reverses the direction. | ~~Чувствительность трекпада по оси X, отрицательное значение для инверсии направления.~~ → **Скорость трекпада по горизонтали. Отрицательное значение меняет направление.**<br>_устарел: описывал старый текст (ось X, обрывок фразы)_ |  |
| 1038 | `title_trackpad_sensitivity_y` | Trackpad Sensitivity Y | Чувствительность трекпада по Y |  |
| 1039 | `summary_trackpad_sensitivity_y` | Vertical trackpad speed. A negative value reverses the direction. | ~~Чувствительность трекпада по оси Y, отрицательное значение для инверсии направления.~~ → **Скорость трекпада по вертикали. Отрицательное значение меняет направление.**<br>_устарел: описывал старый текст (ось Y, обрывок фразы)_ |  |
| 1040 | `title_trackpad_drag_drop_vibration` | Enable Vibration for Drag-and-Drop on Trackpad | ~~Включить вибрацию при Drag-and-Drop на трекпаде~~ → **Включить вибрацию при перетаскивании на трекпаде**<br>_непереведённый Drag-and-Drop; термин: перетаскивание (как в описании)_ |  |
| 1041 | `summary_trackpad_drag_drop_vibration` | Enables vibration feedback for drag-and-drop actions on Samsung trackpad devices. | ~~Включает вибро-отклик для перетаскивания на трекпадах Samsung~~ → **Включает виброотклик при перетаскивании на трекпадах Samsung**<br>_опечатка: «виброотклик» пишется слитно_ |  |
| 1042 | `title_trackpad_drag_drop_threshold` | Hold Duration for Drag-and-Drop Activation on Trackpad | ~~Время удержания для активации Drag-and-Drop на трекпаде~~ → **Время удержания для начала перетаскивания на трекпаде**<br>_непереведённый Drag-and-Drop; термин: перетаскивание_ |  |
| 1043 | `summary_trackpad_drag_drop_threshold` | Set the duration to hold on the trackpad before activating drag-and-drop on Samsung devices. | ~~Установите длительность удержания перед активацией Drag-and-Drop на Samsung~~ → **Установите длительность удержания на трекпаде перед началом перетаскивания на устройствах Samsung**<br>_непереведённый Drag-and-Drop; потеряно «на трекпаде»_ |  |
| 1044 | `title_trackpad_swap_axis` | Swap X and Y axis of the trackpad input | Поменять X и Y оси трекпада |  |
| 1045 | `summary_trackpad_swap_axis` | On some devices, trackpad input may be rotated in axis. Enabling this option may help. | ~~На некоторых устройствах оси трекпада повернуты включение может помочь.~~ → **На некоторых устройствах оси ввода трекпада повёрнуты. Включение этой опции может помочь.**<br>_пропущен знак препинания; ё: «повёрнуты»_ |  |
| 1046 | `title_checkbox_force_qwerty` | Force QWERTY layout | Принудительная раскладка QWERTY | ⚠ long (19→31 chars) — check layout |
| 1047 | `summary_checkbox_force_qwerty` | Force use QWERTY keyboard layout.\nRequired by GFE.\nTurn off if you want to use a different keyboard layout. | ~~Принудительно использовать раскладку QWERTY.\nТребуется GFE.\nВыключите, если хотите другую раскладку.~~ → **Принудительно использовать раскладку QWERTY.\nТребуется для GFE.\nВыключите, если хотите другую раскладку.**<br>_смысл: «Требуется GFE» — «нужен GFE», а надо «нужно для GFE»_ |  |
| 1048 | `title_checkbox_back_as_meta` | Back button as Meta | Кнопка Back как Meta |  |
| 1049 | `summary_back_as_meta` | Send Meta(Win) key on physical back button press. | ~~Отправлять Meta(Win) при нажатии физической кнопки Back~~ → **Отправлять Meta(Win) при нажатии физической кнопки «Назад»**<br>_термин: кнопка «Назад», не Back_ |  |
| 1050 | `title_back_as_guide` | Back button as Guide | Кнопка Back как Guide |  |
| 1051 | `summary_back_as_guide` | Send Guide(PS/HOME) button press when Back button is pressed on controllers. | Отправлять Guide (PS/HOME) при нажатии Back на контроллерах |  |
| 1052 | `title_checkbox_ignore_synth_events` | Ignore synthetic events | Игнорировать синтетические события |  |
| 1053 | `summary_ignore_synth_events` | Ignore synthetic events sent by the Android system. This may resolve issues where mouse clicks trigger other unexpected keys on certain devices.\nEnabling this option will cause the system\'s soft keyboard to stop working. | Игнорировать синтетические события, отправляемые системой Android. Это может решить проблему, когда щелчки мыши вызывают другие неожиданные клавиши на некоторых устройствах.\nВключение этой опции приведёт к тому, что экранная клавиатура системы перестанет работать. |  |
| 1054 | `title_smart_clipboard_sync` | Smart Clipboard Sync (Experimental) | Умная синхронизация буфера (экспериментально) |  |
| 1055 | `summary_smart_clipboard_sync` | Automatically upload clipboard content to server when the stream starts/resumes, download clipboard from server when losing focus(requires Apollo) | ~~Автоматически загружать буфер на сервер при старте/возобновлении и скачивать при потере фокуса (требуется Apollo)~~ → **Автоматически отправлять буфер обмена на сервер при запуске или возобновлении стрима и получать его с сервера при потере фокуса (требуется Apollo)**<br>_неполный: потеряно «стрима»_ |  |
| 1056 | `title_smart_clipboard_sync_toast` | Clipboard Sync Toast | Уведомление о синхронизации буфера | ⚠ long (20→34 chars) — check layout |
| 1057 | `summary_smart_clipboard_sync_toast` | Show toast for clipboard sync result | Показать уведомление о результате синхронизации буфера |  |
| 1058 | `title_hide_clipboard_content` | Hide clipboard content | Скрывать содержимое буфера |  |
| 1059 | `summary_hide_clipboard_content` | Mark remote clipboard as sensitive information | Пометить удалённый буфер как конфиденциальный |  |
| 1060 | `title_settings_misc` | More | ~~РАЗНОЕ~~ → **Разное**<br>_капслок «РАЗНОЕ»_ |  |
| 1061 | `perf_overlay_lite_bandwidth` | Bandwidth | Пропускная способность | ⚠ long (9→22 chars) — check layout |
| 1062 | `perf_overlay_lite_network_decoding_delay` | Network/Decoding delay | Задержка сети/декодирования |  |
| 1063 | `perf_overlay_lite_packet_loss` | Packet loss | Потери пакетов |  |
| 1064 | `wrong_import_format` | This file is not in the expected format. | ~~Неверный формат импорта!~~ → **Неверный формат файла.**<br>_лишний «!» и «импорта»_ |  |
| 1065 | `title_checkbox_gamepad_enable_battery_report` | Enable battery status report for gamepad | Включить отчёт о заряде батареи геймпада |  |
| 1066 | `summary_checkbox_gamepad_enable_battery_report` | Report gamepad battery status when possible.\nDisable this option might help if you experience stutter with touch screen/touch pad/stylus/mouse input occasionally. | Отправлять информацию о заряде батареи геймпада, если это возможно.\nОтключение может помочь при редких фризах ввода (тач/трекпад/стилус/мышь). |  |
| 1067 | `title_checkbox_enforce_display_mode` | Enforce Display Mode | Принудительный режим дисплея |  |
| 1068 | `summary_checkbox_enforce_display_mode` | Force surface to use the optimal display mode.\nRequired by some systems (such as ColorOS) to set refresh rate/resolution properly.\nDo not enable on ChromeCast 4K as it might lead to bugs. | ~~Принудительно использовать оптимальный режим отображения.\nТребуется в некоторых системах (например, ColorOS) для корректной установки частоты/разрешения.\nНе включайте на ChromeCast 4K может вызвать ошибки.~~ → **Принудительно использовать оптимальный режим отображения.\nТребуется в некоторых системах (например, ColorOS) для корректной установки частоты/разрешения.\nНе включайте на ChromeCast 4K: это может вызвать ошибки.**<br>_пропущен знак препинания_ |  |
| 1069 | `title_checkbox_ultra_low_latency` | Ultra Low Latency (experimental) | Сверхнизкая задержка (экспериментально) |  |
| 1070 | `summary_checkbox_ultra_low_latency` | Only effective for SD8Gen2/8(s)Gen3/8Elite and MTK devices. | ~~Эффективно только на SD8Gen2 / 8(s)Gen3 / 8Elite~~ → **Эффективно только на SD8Gen2 / 8(s)Gen3 / 8Elite и устройствах MTK.**<br>_неполный: потеряно «и устройствах MTK»_ |  |
| 1071 | `title_checkbox_forceTightThresholds` | Tight Vsync (Experimental) | ~~Агрессивная вертикальная синхронизация (эксперементально)~~ → **Жёсткая вертикальная синхронизация (экспериментально)**<br>_опечатка «эксперементально»_ | ⚠ long (26→57 chars) — check layout<br>⚠ long (26→53 chars) — check layout |
| 1072 | `summary_checkbox_forceTightThresholds` | Tighter VSYNC thresholds for lower latency; may increase drops. | ~~Более строгие пороги вертикальной синхронизации для снижения задержки; может увеличить количество сбоев.~~ → **Более строгие пороги вертикальной синхронизации для снижения задержки; может увеличить число пропущенных кадров.**<br>_смысл: drops — пропущенные кадры, а не «сбои»_ |  |
| 1073 | `title_checkbox_use_virtual_display` | Use Virtual Display | Использовать виртуальный дисплей | ⚠ long (19→32 chars) — check layout |
| 1074 | `summary_checkbox_use_virtual_display` | Use Virtual Display by default.\nVirtual Display can automatically match your client side resolution and frame rate settings, giving you a seamless streaming experience.\nRequires Apollo as host streaming software. | Использовать виртуальный дисплей по умолчанию.\nВиртуальный дисплей автоматически подбирает клиентское разрешение и частоту, обеспечивая плавный стрим.\nТребует Apollo на хосте. |  |
| 1075 | `title_checkbox_resume_without_confirm` | Quick Resume | Быстрое возобновление | ⚠ long (12→21 chars) — check layout |
| 1076 | `summary_checkbox_resume_without_confirm` | Do not show resume menu when clicking resume button, resume the app immediately. | Не показывать меню возобновления, сразу возобновлять приложение. |  |
| 1077 | `title_checkbox_enable_sticky_modifier_key_virtual_keyboard` | Sticky modifier keys | ~~Фиксированные модификаторы~~ → **Залипающие клавиши-модификаторы**<br>_термин совпадает с описанием: «залипающие»_ |  |
| 1078 | `summary_checkbox_enable_sticky_modifier_key_virtual_keyboard` | Use sticky modifier keys on virtual full keyboard and custom onscreen keyboard. | ~~Использовать фиксированные модификаторы на полноэкранной и пользовательской клавиатурах.~~ → **Использовать залипающие клавиши-модификаторы на виртуальной полной клавиатуре и пользовательской экранной клавиатуре.**<br>_смысл: full keyboard — полная, а не «полноэкранная»; термин: залипающие_ |  |
| 1079 | `virtual_keyboard_hide` | Hide\nKBD | Скрыть\nКЛАВ |  |
| 1080 | `mouse_mode_multi_touch` | Multi touch | Мультитач |  |
| 1081 | `render_mode_2d` | Default 2D | По умолчанию 2D |  |
| 1082 | `render_mode_3d_sbs_movie` | AI SBS 3D Movie (Synced) | ~~AI SBS 3D Фильм (Синхронизированно)~~ → **AI SBS 3D-фильм (синхронизировано)**<br>_опечатка «Синхронизированно»_ |  |
| 1083 | `mouse_mode_absolute_touch` | Absolute touch | Абсолютный ввод |  |
| 1084 | `mouse_mode_track_pad_natural` | Track pad(Natural/Double tap to drag) | Трекпад (Natural/Двойной тап для перетаскивания) |  |
| 1085 | `mouse_mode_track_pad_gaming` | Track pad(Gaming/Long press to drag) | Трекпад (Gaming/Долгое нажатие для перетаскивания) |  |
| 1086 | `mouse_mode_disabled` | Disabled | Выключено |  |
| 1087 | `mouse_mode_absolute_touch_swapped` | Absolute touch (left/right click swapped) | Абсолютный ввод (левый/правый клик поменяны) |  |
| 1088 | `keyboard_layout_set_1` | Profile 1 | Профиль 1 |  |
| 1089 | `keyboard_layout_set_2` | Profile 2 | Профиль 2 |  |
| 1090 | `keyboard_layout_set_3` | Profile 3 | Профиль 3 |  |
| 1091 | `keyboard_layout_set_4` | Profile 4 | Профиль 4 |  |
| 1092 | `keyboard_layout_set_5` | Profile 5 | Профиль 5 |  |
| 1093 | `toggle_local_mouse_cursor` | Toggle local mouse cursor(physical mouse needed) | Переключить локальный курсор (нужна физ. мышь) |  |
| 1094 | `debug_info_android_version` | Android Version: | Версия Android: |  |
| 1095 | `debug_info_api_version` | API Version: | Версия API: |  |
| 1096 | `debug_info_kernel_version` | Kernel Version: | Версия ядра: |  |
| 1097 | `debug_info_brand_model` | Brand and Model: | Бренд и модель: |  |
| 1098 | `debug_info_has_vibration_motor` | Has Vibration Motor | Есть вибромотор |  |
| 1099 | `debug_info_no_vibration_motor` | No Vibration Motor | Нет вибромотора |  |
| 1100 | `debug_info_test_device_vibration` | Test Device Vibration (%s) | Тест вибрации устройства (%s) |  |
| 1101 | `debug_info_vibration_amplitude` | Vibration Amplitude (%d) | Амплитуда вибрации (%d) |  |
| 1102 | `debug_info_simple_vibration` | Simple Vibration for 1 Second | Простая вибрация на 1 секунду |  |
| 1103 | `debug_info_continuous_hd_vibration` | Continuous HD Vibration | Непрерывная HD-вибрация |  |
| 1104 | `debug_info_please_choose` | Please Choose | Выберите |  |
| 1105 | `debug_info_no_gamepad_detected` | No gamepad detected, please connect a gamepad, tap refresh, and try again! | ~~Геймпад не обнаружен, подключите, нажмите обновить и попробуйте снова!~~ → **Геймпад не обнаружен. Подключите геймпад, нажмите «Обновить» и попробуйте снова.**<br>_лишний «!»; название кнопки без кавычек_ |  |
| 1106 | `debug_info_no_vibrator` | No vibrator detected on the gamepad! | В геймпаде не обнаружен вибромотор! |  |
| 1107 | `debug_info_set_amplitude` | Set Amplitude 0-255 (Effective only for HD Vibration) | Установите амплитуду 0–255 (только для HD-вибрации) |  |
| 1108 | `debug_info_name` | Name:  | Имя: |  |
| 1109 | `debug_info_sensors` | Sensors:  | Датчики: |  |
| 1110 | `debug_info_no_relevant_driver` | None (no relevant driver or gamepad not supported) | Нет (нет драйвера или геймпад не поддерживается) |  |
| 1111 | `debug_info_no_api_below_android12` | No corresponding API below Android 12 | Нет соответствующего API для Android ниже 12 |  |
| 1112 | `debug_info_vibration` | Vibration:  | Вибрация: |  |
| 1113 | `debug_info_supported` | Supported | Поддерживается |  |
| 1114 | `debug_info_not_supported` | Not Supported | Не поддерживается |  |
| 1115 | `debug_info_details` | Details:  | Детали: |  |
| 1116 | `debug_info_number_of_gamepads` | Number of Gamepads:  | Количество геймпадов: |  |
| 1117 | `debug_info_accelerometer` | +Accelerometer | +Акселерометр |  |
| 1118 | `debug_info_gyroscope` | +Gyroscope | +Гироскоп |  |
| 1119 | `debug_info_stop_vibration` | Stop Vibration | Остановить вибрацию |  |
| 1120 | `debug_info_refresh_gamepad_info` | Tap to refresh gamepad info | Нажмите, чтобы обновить информацию о геймпаде | ⚠ long (27→45 chars) — check layout |
| 1121 | `debug_info_refresh_gamepad_list` | Refresh gamepad list | Обновить список геймпадов |  |
| 1122 | `debug_info_test_gamepad_rumble` | Test gamepad rumble | Тест вибрации геймпада |  |
| 1123 | `pref_enter_value_0_9999` | Please enter a value between 0 and 9999. | Введите значение от 0 до 9999. |  |
| 1124 | `pref_set_success` | Settings saved. | ~~Настройки сохранены успешно!~~ → **Настройки сохранены.**<br>_лишние «успешно» и «!»_ | ⚠ long (15→28 chars) — check layout |
| 1125 | `pref_empty_file` | The file is empty. | ~~Пустой файл!~~ → **Файл пуст.**<br>_лишний «!»_ |  |
| 1126 | `pref_import_success` | Imported. | ~~Импорт успешен!~~ → **Импортировано.**<br>_лишний «!»_ | ⚠ long (9→15 chars) — check layout |
| 1127 | `pref_error_occurred` | An error occurred:  | Произошла ошибка: |  |
| 1128 | `pref_save_keyboard_profile` | Save OSK profile | Сохранить профиль экранной клавиатуры | ⚠ long (16→37 chars) — check layout |
| 1129 | `game_menu_advanced` | Advanced Menu | Расширенное меню |  |
| 1130 | `game_dialog_title_quit_confirm` | Really want to quit? | Действительно хотите выйти? |  |
| 1131 | `game_dialog_message_quit_confirm` | Please make sure you have no unsaved progress. Quitting the session will terminate your current running application. | Убедитесь, что нет несохранённого прогресса. Завершение сессии закроет текущее приложение. |  |
| 1132 | `game_menu_quit_session` | Quit Session | ~~Завершить сессию~~ → **Завершить сессию**<br>_одна английская строка была переведена двумя способами; оставлен вариант игрового меню_ |  |
| 1133 | `game_menu_server_cmd` | Server Commands | Команды сервера |  |
| 1134 | `game_menu_fetch_clipboard` | Fetch Clipboard | Получить буфер обмена |  |
| 1135 | `game_menu_upload_clipboard` | Upload Clipboard | Отправить буфер обмена |  |
| 1136 | `game_dialog_title_server_cmd_empty` | No Server Commands | Нет команд сервера |  |
| 1137 | `game_dialog_message_server_cmd_empty` | Please make sure you\'re using Apollo as server software and has been granted this client with "Server Command" permission. | Убедитесь, что на сервере установлен Apollo и этому клиенту предоставлено разрешение Server Command. |  |
| 1138 | `vdisplay_not_ready` | Virtual display driver isn\'t ready on the server. Please make sure the SudoVDA driver is installed and enabled. | ~~Виртуальный драйвер дисплея на сервере не готов. Пожалуйста, убедитесь, что драйвер SudoVDA установлен и включён.~~ → **Драйвер виртуального дисплея на сервере не готов. Пожалуйста, убедитесь, что драйвер SudoVDA установлен и включён.**<br>_смысл: «виртуальный драйвер дисплея» вместо «драйвер виртуального дисплея»_ |  |
| 1139 | `clipboard_sync_unsupported` | This server does not support clipboard sync. Please install or upgrade your server to the latest version of Apollo. | Этот сервер не поддерживает синхронизацию буфера. Установите или обновите сервер до последней версии Apollo. |  |
| 1140 | `send_clipboard_failed` | Failed to send clipboard:  | Не удалось отправить буфер обмена: |  |
| 1141 | `external_display_info` | External Display connected with: %1$dx%2$d at %3$.1fHz | ~~Внешний дисплей подключён с: %1$dx%2$d при %3$.1fГц~~ → **Внешний дисплей подключён: %1$dx%2$d, %3$.1f Гц**<br>_калька «подключён с:», неверное «при»_ |  |
| 1142 | `notification_channel_name` | External Display Control | Управление внешним дисплеем |  |
| 1143 | `notification_title` | External Display Active | Внешний дисплей активен |  |
| 1144 | `notification_text` | Tap to open touchpad controller | Нажмите, чтобы открыть контроллер-тачпад |  |
| 1145 | `permission_denied` | Notification permission denied | Разрешение на уведомления отклонено |  |
| 1146 | `no_external_display` | No external display detected | Внешний дисплей не обнаружен |  |
| 1147 | `no_game_instance` | No game instance available | Экземпляр игры недоступен |  |
| 1148 | `get_clipboard_failed` | Failed to get clipboard:  | Не удалось получить буфер обмена: |  |
| 1149 | `send_clipboard_success` | Clipboard sent successfully | Буфер обмена успешно отправлен |  |
| 1150 | `get_clipboard_success` | Clipboard get successfully | Буфер обмена успешно получен |  |
| 1151 | `proceed` | Proceed | Продолжить |  |
| 1152 | `cancel` | Cancel | Отмена |  |
| 1153 | `unlocking_or_starting` | Server is starting or computer is unlocking, please wait… | Сервер запускается или компьютер разблокируется — подождите… |  |
| 1154 | `error_msg_permission_denied` | Permission Denied | Доступ запрещён |  |
| 1155 | `error_msg_timeout` | Connection Timeout | Таймаут соединения |  |
| 1156 | `permission_launch_app` | Launch Apps | Запустить приложения | ⚠ long (11→20 chars) — check layout |
| 1157 | `permission_sync_clipboard` | Sync Clipboard | Синхр. буфера обмена |  |
| 1158 | `searchpreference_search` | Search… | Поиск… |  |
| 1159 | `searchpreference_clear` | Clear | Очистить |  |
| 1160 | `searchpreference_history_entry` | History entry | Запись истории |  |
| 1161 | `searchpreference_more` | More | Ещё |  |
| 1162 | `searchpreference_clear_history` | Clear history | Очистить историю |  |
| 1163 | `searchpreference_no_results` | No results | Нет результатов |  |
| 1164 | `keyboard_clear_all` | Clear All | Очистить всё |  |
| 1165 | `keyboard_add_keys` | Add Keys | Добавить клавиши | ⚠ long (8→16 chars) — check layout |
| 1166 | `keyboard_select_keys` | Select Keys to Add | Выберите клавиши для добавления | ⚠ long (18→31 chars) — check layout |
| 1167 | `keyboard_clear_all_confirm_title` | Clear All Keys | Удалить все клавиши |  |
| 1168 | `keyboard_clear_all_confirm_message` | Are you sure you want to hide all on-screen controls? You can add them back later in configuration mode. | Вы уверены, что хотите скрыть все экранные элементы? Их можно вернуть в режиме настройки. |  |
| 1169 | `keyboard_keys_added` | %d keys added successfully | %d клавиш успешно добавлено |  |
| 1170 | `keyboard_duplicates_skipped` | %d duplicates were skipped | %d дубликатов пропущено |  |
| 1171 | `keyboard_configure_movable` | You can now move the settings button. | Теперь можно переместить кнопку настроек. |  |
| 1172 | `keyboard_load_error` | Error loading keyboard configuration: %s | Ошибка загрузки конфигурации клавиатуры: %s |  |
| 1173 | `keyboard_add` | Add | Добавить | ⚠ long (3→8 chars) — check layout |
| 1174 | `keyboard_key_custom` | %s (Custom) | %s (польз.) |  |
| 1175 | `category_basic_settings` |      <string name="title_checkbox_stretch_video" />           <string name="export_launcher_computer_details_incomplete">Cannot export: Computer details are incomplete. | Основные настройки |  |
| 1176 | `export_launcher_app_details_incomplete` | Cannot export: App details are incomplete. | Невозможно экспортировать: данные о приложении неполны. |  |
| 1177 | `failed_to_initiate_file_export` | Failed to initiate file export: %s | Не удалось начать экспорт файла: %s |  |
| 1178 | `file_export_failed_no_location_selected` | File export failed: No location selected. | Экспорт не выполнен: не выбрана папка. |  |
| 1179 | `file_export_failed_no_content_to_write` | File export failed: No content to write. | Экспорт не выполнен: нет содержимого для записи. |  |
| 1180 | `file_exported_successfully` | File exported successfully. | Файл успешно экспортирован. |  |
| 1181 | `failed_to_open_file_for_writing` | Failed to open file for writing. | Не удалось открыть файл для записи. |  |
| 1182 | `error_writing_file` | Error writing file: %s | Ошибка записи файла: %s |  |
| 1183 | `unexpected_error_during_file_export` | An unexpected error occurred during file export. | При экспорте произошла непредвиденная ошибка. |  |
| 1184 | `file_export_cancelled` | File export cancelled. | Экспорт отменён. |  |
| 1185 | `app_removed_from_pc` | App removed from PC | Приложение удалено с ПК |  |
| 1186 | `title_export_sunshine_launcher_file` | Export Launcher File for Sunshine | Экспорт файла запуска для Sunshine |  |
| 1187 | `message_export_sunshine_launcher_file` | Exporting launcher file for Sunshine is unstable, and may break at any moment. You\'ll need to export again every time if you changed the app name or image.\nUse Apollo for a more stable experience. | ~~Экспорт лаунчера для Sunshine нестабилен и может ломаться. При изменении имени или картинки экспорт придётся делать заново.\nДля стабильности используйте Apollo.~~ → **Экспорт лаунчера для Sunshine нестабилен и может перестать работать в любой момент. При изменении названия приложения или картинки экспорт придётся делать заново.\nДля стабильной работы используйте Apollo.**<br>_неполный: потеряно «at any moment»_ |  |
| 1188 | `title_enable_commit_text` | Enable commit-text input (swipe/voice) | Включить передачу готового текста (свайп/голос) |  |
| 1189 | `summary_enable_commit_text` | Forward multi-character text from soft keyboards (gesture typing, predictions, voice dictation). May break games that rely on key-by-key input. | Передаёт на ПК многосимвольный текст из экранных клавиатур (жестовый ввод, подсказки, голосовой ввод). Может нарушить работу игр, ожидающих посимвольного ввода. |  |
| 1190 | `title_checkbox_remember_zoom_pan` | Remember Zoom&amp;Pan | Запоминать прокрутку/масш. |  |
| 1191 | `summary_checkbox_remember_zoom_pan` | Save changes to zoom and pan position between sessions | Сохранять масштаб и позицию между сессиями |  |
| 1192 | `title_checkbox_enable_perf_overlay_bottom` | Move overlay to bottom | Переместить панель вниз |  |
| 1193 | `summary_checkbox_enable_perf_overlay_bottom` | Useful when Display in Top Center and Lite mode are enabled during non-native resolution streaming. | ~~Полезно когда дисплей вверху в центре и упрощенном режиме при ненативном разрешении.~~ → **Полезно, когда при стриме в ненативном разрешении включены «Отображать вверху по центру» и упрощённый режим.**<br>_смысл искажён («дисплей вверху в центре»), пропущена запятая, ё: «упрощённом»_ |  |
| 1194 | `title_edit_profile` | Edit Profile | Редактировать профиль | ⚠ long (12→21 chars) — check layout |
| 1195 | `profile_manager_new_profile` | New Profile | Новый профиль |  |
| 1196 | `profile_manager_profile_not_found` | Profile not found | Профиль не найден |  |
| 1197 | `profile_manager_edit_profile` | "Edit Profile: " | Редактировать профиль: |  |
| 1198 | `profile_manager_profile` | "Profile " | Профиль |  |
| 1199 | `profile_manager_profile_saved` | Profile \'%s\' saved. | Профиль \'%s\' сохранён. |  |
| 1200 | `profile_manager_edit_profile_name` | Edit Profile Name | Редактировать имя профиля |  |
| 1201 | `profile_manager_name_cannot_be_blank` | Name cannot be blank | Имя не может быть пустым |  |
| 1202 | `profile_manager_edit_profile_with` | Edit Profile: %s | Редактировать профиль: %s |  |
| 1203 | `profile_manager_new_profile_with` | New Profile: %s | Новый профиль: %s |  |
| 1204 | `profile_manager_no_profiles_yet` | No profiles yet | Профилей пока нет |  |
| 1205 | `profile_manager_profiles_description` | Profiles allow you to create and save different streaming configurations. Each profile stores its own settings which can be quickly switched between. | ~~Профили позволяют создавать и сохранять разные конфигурации стриминга. Каждый профиль хранит свои настройки, между которыми можно быстро переключаться.~~ → **Профили позволяют создавать и сохранять разные конфигурации стрима. Каждый профиль хранит свои настройки, между которыми можно быстро переключаться.**<br>_термин: стрим_ |  |
| 1206 | `profile_manager_tap_create_profile` | Tap + to create your first profile | ~~Нажмите + чтобы создать первый профиль~~ → **Нажмите +, чтобы создать первый профиль**<br>_пропущена запятая_ |  |
| 1207 | `profile_manager_choose_profile` | Choose Profile | Выбрать профиль |  |
| 1208 | `profile_manager_deactivated_profile` | Deactivated profile | Деактивированный профиль |  |
| 1209 | `profile_manager_activated_profile` | Activated profile \'%s\' | Профиль \'%s\' активирован |  |
| 1210 | `profile_manager_delete_profile` | Delete Profile | Удалить профиль |  |
| 1211 | `profile_manager_confirm_profile_deleteion` | Are you sure you want to delete \'%s\'? | Уверены, что хотите удалить \'%s\'? |  |
| 1212 | `profile_manager_delete` | Delete | Удалить |  |
| 1213 | `profile_manager_profile_deleted` | Deleted profile \'%s\' | Профиль \'%s\' удалён |  |
| 1214 | `profile_manager_failed_to_save` | Failed to save profile. Please check logcat for details. | Не удалось сохранить профиль. Проверьте logcat. |  |
| 1215 | `profile_manager_failed_to_load` | Failed to load profiles. Please check logcat for details. | Не удалось загрузить профили. Проверьте logcat. |  |
| 1216 | `profile_manager_active_profile` | Active profile: %s | Активный профиль: %s |  |
| 1217 | `rename` | Rename | Переименовать | ⚠ long (6→13 chars) — check layout |
| 1218 | `save` | Save | Сохранить | ⚠ long (4→9 chars) — check layout |
| 1219 | `title_low_latency_frame_balance` | LFR (Experimental) | ~~LFR (эксперементально)~~ → **LFR (экспериментально)**<br>_опечатка «эксперементально»_ |  |
| 1220 | `summary_low_latency_frame_balance` | Minimizes delay by dropping queued frames. | Уменьшает задержку за счёт пропуска кадров в очереди |  |
| 1221 | `category_perf_monitor_settings` | Performance overlay | ~~Монитор производительности~~ → **Панель производительности**<br>_термин не совпадал с «Вкл./выкл. панель производительности»_ |  |
| 1222 | `category_perf_charts` | Performance Charts | Графики производительности |  |
| 1223 | `desc_chart_latency` | Network latency chart | График задержки сети |  |
| 1224 | `desc_chart_decode` | Decode time chart | График времени декодирования | ⚠ long (17→28 chars) — check layout |
| 1225 | `desc_chart_fps` | FPS chart | График FPS |  |
| 1226 | `title_enable_perf_charts` | Enable Performance Charts | Включить графики производительности |  |
| 1227 | `summary_enable_perf_charts` | Display performance charts in the game overlay | Вывод графиков производительности в игровой панели |  |
| 1228 | `title_perf_chart_latency` | Chart: Network Latency | График: задержка сети |  |
| 1229 | `summary_perf_chart_latency` | Chart of average network latency (ms) | График средней задержки сети (мс) |  |
| 1230 | `title_perf_chart_decode` | Chart: Decode Time | График: время декодирования |  |
| 1231 | `summary_perf_chart_decode` | Chart of frame decode time (ms) | График времени декодирования кадра (мс) |  |
| 1232 | `title_perf_chart_fps` | Chart: FPS | График: FPS |  |
| 1233 | `summary_perf_chart_fps` | Chart of incoming/rendered frames per second | ~~График входящих/отрендереных кадров в секунду~~ → **График входящих и отрисованных кадров в секунду**<br>_опечатка «отрендереных»_ |  |
| 1234 | `title_checkbox_full_screen` | Enable Full Screen | Включить полноэкранный режим |  |
| 1235 | `summary_checkbox_full_screen` | Hide system bars with immersive mode | Скрывать системные панели в режиме погружения |  |
