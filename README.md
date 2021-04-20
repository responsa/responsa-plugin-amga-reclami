# responsa-plugin-amga-reclami

Install VSCode StandardJS plugin.
Open VSCode settings.json and add these two lines:

`"standard.usePackageJson": true,`

`"standard.autoFixOnSave": true`

API 

Compliant
```
GET /actions/complaint
Reads complaint informations in basic or extended formats
```

Input:
```
id *required
number
(query)
[Complaint number]

extended *default value = false
boolean
(query)
[Extended format required]
```

Output
```
{
    description:	
    Complaint infos successfully returned

    status*	string
    nullable: false
    Complaint Status

    department	string
    nullable: true
    Complaint Department

    assignee	string
    nullable: true
    Complaint Assignee

    email	string
    nullable: true
    Mail address complaint was sent to

    subject	string
    nullable: true
    Complaint mail subject

    content	string
    nullable: true
    Complaint mail content

}
```

OTP Service
```
POST /actions/otp
Sends OTP code via SMS with default text and returns the OTP itself
```

Input:
```
{
    phone*	string
    nullable: false
    pattern: ^^\+\d{7,15}$
    The telephone number preceeded by the international prefix on which to send SMS

}

(Request Body *required)
```

Output
```
{
    description:	
    Verification code generated successfully

    verificationCode	number
    nullable: true
    Verification code

}
```

CRM PDR Service
```
GET /actions/pdr
Searches for the contract related to the incoming PDR code and returns info on the associated address
```

Input:
```
code *required
string
(query)
[The PDR code to search for contract info]
```

Output
```
{
    description:	
    Contract address info retrieved successfully

    streetName	string
    nullable: true
    Street name

    streetNumber	string
    nullable: true
    Street number

    city	string
    nullable: true
    City

}
```

CRM POD Service
```
GET /actions/pod
Searches for the contract related to the incoming POD code and returns info on the associated address
```

Input:
```
code *required
string
(query)
[The POD code to search for contract info]
```

Output
```
{
    description:	
    Contract address info retrieved successfully

    streetName	string
    nullable: true
    Street name

    streetNumber	string
    nullable: true
    Street number

    city	string
    nullable: true
    City

}
```

Privacy Acceptance
```
GET /actions/privacy
Execute a get to aquire acceptance of the user's privacy
```

Input:
```
email *required
string
(query)
[The user's email address]
```

Output
```
{
    description:	
    Privacy acceptance read successfully

    result	boolean
    nullable: false
    Flag indicating the existence of privacy acceptance

}
```

Read Privacy Acceptance
```
GET /actions/privacy
Execute a get to aquire acceptance of the user's privacy
```

Input:
```
email *required
string
(query)
[The user's email address]
```

Output
```
{
    description:	
    Privacy acceptance read successfully
    
    result	boolean
    nullable: false
    Flag indicating the existence of privacy acceptance

}
```

Privacy Acceptance
```
POST /actions/privacy
Execute a post to send acceptance of the user's privacy
```

Input:
```
{
    email*	string
    nullable: false
    pattern: ^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
    User mail address

    accepted*	boolean
    nullable: false
    Flag to indicate whether the user has accepted or not
}
(Request Body *required)
```

Output
```
{
    description:	
    Privacy acceptance read successfully

    result	boolean
    nullable: false
    Flag indicating the existence of privacy acceptance

}
```

Privacy Acceptance
```
GET /actions/privacy
Execute a get to aquire acceptance of the user's privacy
```

Input:
```
email *required
string
(query)
[The user's email address]
```

Output
```
{
    description:	
    Privacy acceptance read successfully
    
    result	boolean
    nullable: false
    Flag indicating the existence of privacy acceptance

}
```