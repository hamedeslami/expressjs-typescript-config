/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: User authentication web service
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          login:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *              properties:
 *                  username:
 *                      type: string
 *                      example: "09121234567"
 *                  password:
 *                      type: string
 *                      example: "password123"
 *          refreshToken:
 *              type: object
 *              required:
 *                  - refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Sj2tK9sF44NmwtQwX4wJ3Xt5gM2Rx24hr3XHyt6vgQk"
 */

/**
 * @swagger
 *  /auth/login:
 *   post:
 *      summary: Login user to get a token and refresh token
 *      tags:
 *           - Auth
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          200:
 *              description: Successful login
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 200
 *                              message:
 *                                  type: string
 *                                  example: "Login successful"
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      accessToken:
 *                                          type: string
 *                                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Sj2tK9sF44NmwtQwX4wJ3Xt5gM2Rx24hr3XHyt6vgQk"
 *                                      refreshToken:
 *                                          type: string
 *                                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Sj2tK9sF44NmwtQwX4wJ3Xt5gM2Rx24hr3XHyt6vgQk"
 *                                      type:
 *                                          type: string
 *                                          example: "Bearer"
 *                                      expiresIn:
 *                                          type: integer
 *                                          example: 600
 *          400:
 *              description: Invalid request data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 400
 *                              message:
 *                                  type: string
 *                                  example: "There was an error validating the sent information"
 *                              data:
 *                                  type: null
 *                                  example: null
 *          401:
 *              description: Invalid username or password
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 401
 *                              message:
 *                                  type: string
 *                                  example: "Invalid username or password"
 *                              data:
 *                                  type: null
 *                                  example: null
 */

/**
 * @swagger
 *  /auth/refresh-token:
 *   post:
 *      summary: Refresh the access token using the refresh token
 *      tags:
 *           - Auth
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/refreshToken"
 *      responses:
 *          200:
 *              description: Successfully refreshed the token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 200
 *                              message:
 *                                  type: string
 *                                  example: "Refresh token created successfully"
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      accessToken:
 *                                          type: string
 *                                          example: "new-access-token"
 *          400:
 *              description: Invalid request body or validation errors
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 400
 *                              message:
 *                                  type: string
 *                                  example: "Invalid refresh token"
 *                              data:
 *                                  type: null
 *                                  example: null
 *          401:
 *              description: Unauthorized, refresh token invalid or expired
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 401
 *                              message:
 *                                  type: string
 *                                  example: "Invalid or expired refresh token"
 *                              data:
 *                                  type: null
 *                                  example: null
 */
