/**
 * @swagger
 *  tags:
 *      - name: "RBAC"
 *        description: "Role-Based Access Control (RBAC) management"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "admin"
 */

/**
 * @swagger
 *  /rbac/roles/create:
 *   post:
 *      summary: Create a new role
 *      tags:
 *           - RBAC
 *      security:
 *           - BearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Role"
 *      responses:
 *          201:
 *              description: Role created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 201
 *                              message:
 *                                  type: string
 *                                  example: "Role created successfully"
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                          example: "123"
 *                                      name:
 *                                          type: string
 *                                          example: "admin"
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
 *                                  example: "Invalid request body"
 *                              data:
 *                                  type: null
 *                                  example: null
 */

/**
 * @swagger
 *  /rbac/roles/{id}:
 *   put:
 *      summary: Update a role
 *      tags:
 *           - RBAC
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *            example: "123"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Role"
 *      responses:
 *          200:
 *              description: Role updated successfully
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
 *                                  example: "Role updated successfully"
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                          example: "123"
 *                                      name:
 *                                          type: string
 *                                          example: "admin"
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
 *                                  example: "Invalid request body"
 *                              data:
 *                                  type: null
 *                                  example: null
 *          404:
 *              description: Role not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 404
 *                              message:
 *                                  type: string
 *                                  example: "Role not found"
 *                              data:
 *                                  type: null
 *                                  example: null
 */

/**
 * @swagger
 *  /rbac/roles/{id}:
 *   delete:
 *      summary: Delete a role
 *      tags:
 *           - RBAC
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *            example: "123"
 *      responses:
 *          200:
 *              description: Role deleted successfully
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
 *                                  example: "Role deleted successfully"
 *                              data:
 *                                  type: null
 *                                  example: null
 *          404:
 *              description: Role not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 404
 *                              message:
 *                                  type: string
 *                                  example: "Role not found"
 *                              data:
 *                                  type: null
 *                                  example: null
 */