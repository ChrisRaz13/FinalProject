# FinalProject
## Vision Board Application

### Description
The Vision Board application is an interactive platform that enables users to create personalized boards with various posts. It is designed to serve as a tool for inspiration and motivation, where users can visualize their goals and aspirations by pinning posts that represent them. Built with a RESTful approach using Spring Boot and Angular, the application allows for robust user interactions through a modern web interface.

### Technologies Used
- Java
- Spring Boot
- RESTful APIs
- Bootstrap
- Angular
- Trello (for project management)

### Features
- **Board Creation**: Users can create and customize their own vision boards.
- **Post Pinning**: Users can pin posts with images, texts, or links to their boards.
- **Interactivity**: Users can like and comment on boards and posts, promoting user engagement.
- **CRUD Operations**: Full Create, Read, Update, and Delete operations for boards and posts.
- **Authentication and Authorization**: Secured user access with different authorization levels.

### Lessons Learned
- **Spring Boot**: Gained proficiency in using Spring Boot for creating a RESTful backend.
- **Angular**: Enhanced skills in building dynamic front-end applications with Angular.
- **Bootstrap**: Applied Bootstrap for crafting a responsive and attractive UI.
- **Collaboration**: Mastered the art of team collaboration using version control and Agile methodologies.
- **JPA**: Deepened understanding of Java Persistence API for effective database management.
- **Stand-up Meetings**: Learned the importance of regular stand-up meetings in keeping the team informed and focused.

### API Endpoints and Expected Outcomes

| HTTP Verb | URI                                           | Request Body          | Response Body               | Status Codes                |
|-----------|-----------------------------------------------|-----------------------|-----------------------------|-----------------------------|
| POST      | `/register`                                   | User JSON             | Registered User JSON        | 200 (OK), 400 (Bad Request) |
| GET       | `/authenticate`                               |                       | User JSON                   | 200 (OK), 401 (Unauthorized)|
| GET       | `/api/boards`                                 |                       | List of Boards JSON         | 200 (OK)                    |
| GET       | `/api/boards/{id}`                            |                       | Board JSON                  | 200 (OK), 404 (Not Found)   |
| POST      | `/api/boards`                                 | Board JSON            | Created Board JSON          | 201 (Created), 400 (Bad Request) |
| PUT       | `/api/boards/{id}`                            | Board JSON            | Updated Board JSON          | 200 (OK), 404 (Not Found), 400 (Bad Request) |
| DELETE    | `/api/boards/{id}`                            |                       |                             | 204 (No Content), 404 (Not Found), 400 (Bad Request) |
| GET       | `/api/boards/search/{userId}`                 |                       | List of Boards JSON         | 200 (OK), 404 (Not Found)   |
| GET       | `/api/boards/search/likedbyuser/{userId}`     |                       | List of Liked Boards JSON   | 200 (OK), 404 (Not Found)   |
| GET       | `/api/boards/{id}/posts`                      |                       | List of Posts JSON          | 200 (OK), 404 (Not Found)   |
| GET       | `/api/posts`                                  |                       | List of Posts JSON          | 200 (OK)                    |
| GET       | `/api/posts/{id}`                             |                       | Post JSON                   | 200 (OK), 404 (Not Found)   |
| POST      | `/api/posts`                                  | Post JSON             | Created Post JSON           | 201 (Created), 400 (Bad Request) |
| PUT       | `/api/posts/{id}`                             | Post JSON             | Updated Post JSON           | 200 (OK), 404 (Not Found), 400 (Bad Request) |
| DELETE    | `/api/posts/{id}`                             |                       |                             | 204 (No Content), 404 (Not Found), 400 (Bad Request) |
| GET       | `/api/posts/search/categories/{category}`     |                       | Posts by Category JSON      | 200 (OK), 404 (Not Found)   |
| GET       | `/api/posts/search/board/{boardId}`           |                       | Posts by Board ID JSON      | 200 (OK), 404 (Not Found)   |
| GET       | `/api/users`                                  |                       | List of Users JSON          | 200 (OK)                    |
| GET       | `/api/users/{id}`                             |                       | User JSON                   | 200 (OK), 404 (Not Found)   |
| POST      | `/api/users`                                  | User JSON             | Created User JSON           | 201 (Created), 400 (Bad Request) |
| PUT       | `/api/users/{id}`                             | User JSON             | Updated User JSON           | 200 (OK), 404 (Not Found), 400 (Bad Request) |
| DELETE    | `/api/users/{id}`                             |                       |                             | 204 (No Content), 404 (Not Found), 400 (Bad Request) |
| PUT       | `/api/users/{id}/disable`                     |                       | User Disabled               | 204 (No Content), 404 (Not Found) |
| PUT       | `/api/users/{id}/enable`                      |                       | User Enabled                | 204 (No Content), 404 (Not Found) |
| POST      | `/api/users/{id}/resetPassword`               | Password String       | Updated User JSON           | 200 (OK), 404 (Not Found)   |
| GET       | `/api/categories`                             |                       | List of Categories JSON     | 200 (OK)                    |
| GET       | `/api/categories/{id}`                        |                       | Category JSON               | 200 (OK), 404 (Not Found)   |
| POST      | `/api/categories`                             | Category JSON         | Created Category JSON       | 201 (Created), 400 (Bad Request) |
| PUT       | `/api/categories/{id}`                        | Category JSON         | Updated Category JSON       | 200 (OK), 404 (Not Found), 400 (Bad Request) |
| DELETE    | `/api/categories/{id}`                        |                       |                             | 204 (No Content), 404 (Not Found), 400 (Bad Request) |
| GET       | `/api/comments`                               |                       | List of Comments JSON       | 200 (OK)                    |
| GET       | `/api/comments/{id}`                          |                       | Comment JSON                | 200 (OK), 404 (Not Found)   |
| POST      | `/api/comments`                               | Comment JSON          | Created Comment JSON        | 201 (Created), 400 (Bad Request) |
| PUT       | `/api/comments/{id}`                          | Comment JSON          | Updated Comment JSON        | 200 (OK), 404 (Not Found), 400 (Bad Request) |
| DELETE    | `/api/comments/{id}`                          |                       |                             | 204 (No Content), 404 (Not Found), 400 (Bad Request) |
| GET       | `/api/comments/boards/{boardId}`              |                       | Comments by Board ID JSON   | 200 (OK), 404 (Not Found)   |
| GET       | `/api/boardLikes`                             |                       | List of Board Likes JSON    | 200 (OK)                    |
| POST      | `/api/boardLikes`                             | BoardLike JSON        | Created BoardLike JSON      | 201 (Created), 409 (Conflict)|
| GET       | `/api/boardLikes/{userId}/{boardId}`          |                       | BoardLike JSON              | 200 (OK), 404 (Not Found)   |
| DELETE    | `/api/boardLikes/{userId}/{boardId}`          |                       |                             | 204 (No Content), 404 (Not Found), 400 (Bad Request) |
| GET       | `/api/boardLikes/search/user/{userId}`        |                       | BoardLikes by User ID JSON  | 200 (OK), 404 (Not Found)   |

## URL

```
http://3.13.43.122:8080/Dreamscape
```