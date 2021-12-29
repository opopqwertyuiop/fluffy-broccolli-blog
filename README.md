# Интернет-блог

Цель данного проекта создание полноценно SPA fullstack приложения, реализующего основной функционал интернет-блога.

## Используемые технологии

### Frontend
* React в качестве основной frontend-библиотеки
* Redux в качестве инструмента управления состоянием приложения
* Quill в качестве WYSIWYG текстового редактора
* Axios в качестве http-клиента

### Backend
* Django, Django REST framework в качестве основного backend-frameworkа
* PostgreSQL в качестве базы данных

## Основные сущности 
### User
Данное приложение поддерживает регистрацию и авторизацию новых пользователей. Авторизированный пользователь имеет следующие возможности:
* Добавлять собственные статьи, редактировать их, скрывать и удалять. 
* Оставлять комментарии под статьями
* Оценивать статьи
* Просматривать список добавленных им статей

Неавторизированный пользователь имеет возможность просматривать статьи и комментарии к ним.

**Модель**:
* id - уникальный идентификатор пользователя
* username - уникальное имя пользователя
* password - хеш пароль

### Article
Основной функционал данного приложения - добавление статей.  Текст статей поддерживает WYSIWYG редактирование. Также в приложении присутствует поиск по статьям.

**Модель**:
* id - уникальный идентификатор статьи
* author_id - внешний ключ, который указывает на идентификатор автора статьи
* short_description - короткое описание статьи
* content - основное содержимое статьи
* is_published - поле, указывающее ли опубликована статья
* created_at - дата создания статьи
* updated_at - дата последнего редактирования статьи

### Comment
Данное приложение поддерживает возможность создания комментариев для статей. 

**Модель**:
* id - уникальный идентификатор комментария
* author_id - внешний ключ, который указывает на идентификатор автора комментария
* article_id - внешний ключ, который указывает на идентификатор статьи, к которой был оставлен комментарий
* content - основное содержимое комментария
* created_at - дата создания комментария