# responsa-plugin-amga-reclami

Install VSCode StandardJS plugin.
Open VSCode settings.json and add these two lines:

`"standard.usePackageJson": true,`

`"standard.autoFixOnSave": true`

API - Complaint - GET - Reads complaint informations in basic or extended formats

Input:

```
"parameters": [
					{
						"name": "id",
						"in": "query",
						"required": true,
						"description": "Complaint number",
						"schema": {
							"type": "number",
							"pattern": "^[0-9]+$",
							"description": "Complaint number"
						}
					},
					{
						"name": "extended",
						"in": "query",
						"description": "Extended format required",
						"schema": {
							"type": "boolean",
							"default": false,
							"pattern": "^[true|false]$",
							"description": "Extended format required"
						}
					}
				]
```

Output:

```
"properties": {
					"status": {
						"type": "string",
						"description": "Complaint Status",
						"nullable": false
					},
					"department": {
						"type": "string",
						"description": "Complaint Department",
						"nullable": true
					},
					"assignee": {
						"type": "string",
						"description": "Complaint Assignee",
						"nullable": true
					},
					"email": {
						"type": "string",
						"description": "Mail address complaint was sent to",
						"nullable": true
					},
					"subject": {
						"type": "string",
						"description": "Complaint mail subject",
						"nullable": true
					},
					"content": {
						"type": "string",
						"description": "Complaint mail content",
						"nullable": true
					}
				}
```

API - Otp - POST - Verification code generated successfully

Input

```
"properties": {
					"phone": {
						"type": "string",
						"nullable": false,
						"pattern": "^^\\+\\d{7,15}$",
						"description": "The telephone number preceeded by the international prefix on which to send SMS"
					}
				}
```

Output

```
"properties": {
					"verificationCode": {
						"type": "number",
						"description": "Verification code",
						"nullable": true
					}
				}
```

API - Pod - GET - Contract address info retrieved successfully

Input

```
"parameters": [
					{
						"name": "code",
						"in": "query",
						"required": true,
						"description": "The POD code to search for contract info",
						"schema": {
							"type": "string",
							"nullable": false,
							"pattern": "^IT\\d{3}E\\d{8}$",
							"description": "The POD code to search for contract info"
						}
					}
				]
```

Output

```
"properties": {
					"streetName": {
						"type": "string",
						"description": "Street name",
						"nullable": true
					},
					"streetNumber": {
						"type": "string",
						"description": "Street number",
						"nullable": true
					},
					"city": {
						"type": "string",
						"description": "City",
						"nullable": true
					}
				
```

API - Pdr - GET - Contract address info retrieved successfully

Input
```
"parameters": [
					{
						"name": "code",
						"in": "query",
						"required": true,
						"description": "The PDR code to search for contract info",
						"schema": {
							"type": "string",
							"nullable": false,
							"pattern": "^\\d{14}$",
							"description": "The PDR code to search for contract info"
						}
					}
				]
```

Output
```
"properties": {
					"streetName": {
						"type": "string",
						"description": "Street name",
						"nullable": true
					},
					"streetNumber": {
						"type": "string",
						"description": "Street number",
						"nullable": true
					},
					"city": {
						"type": "string",
						"description": "City",
						"nullable": true
					}
				
```

API - Privacy - POST - Privacy acceptance generated successfully

Input

```
"properties": {
					"email": {
						"type": "string",
						"nullable": false,
						"description": "User mail address",
						"pattern": "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
					},
					"accepted": {
						"type": "boolean",
						"nullable": false,
						"description": "Flag to indicate whether the user has accepted or not"
					}
				}
```

Output

```
"properties": {}
```

API - Privacy - GET - Privacy acceptance read successfully

Input

```
"properties": {
					"parameters": [
					{
						"name": "email",
						"in": "query",
						"required": true,
						"description": "The user's email address",
						"schema": {
							"type": "string",
							"description": "The user's email address",
							"pattern": "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
						}
					}
				]
```

Output

```
"properties": {
					"result": {
						"type": "boolean",
						"description": "Flag indicating the existence of privacy acceptance",
						"nullable": false
					}
				}
```