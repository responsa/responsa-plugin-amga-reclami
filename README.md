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

Complaint
```
POST /actions/otp
Execute a post to send a complaint issue
```

Input:
```
{
    usage*	string
    nullable: false
    Domestic or not domestic

    requestArea* string
    nullable: false
    Request area (GAS or Energy)

    code string
    nullable: true
    POD or PDR code

    email*	string
    nullable: false
    pattern: ^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
    User mail address

    phone*	string
    nullable: false
    pattern: ^^\+\d{7,15}$
    Phone number

    isPrivateApplicant*	boolean
    nullable: false
    Determines whether a natural or legal person

    firstName string
    nullable: false
    First name

    lastName string
    nullable: false
    Last name

    fiscalCode	string
    nullable: false
    Fiscal code

    businessName string
    nullable: false
    Business name

    vatNumber string
    nullable: false
    VAT number

    streetName*	string
    nullable: false
    Street name

    streetNumber* string
    nullable: false
    Street number

    city* string
    nullable: false
    City name

    province* string
    nullable: false
    Province name

    quotationCode string
    nullable: false
    Quotation code

    isEnergyProducer boolean
    nullable: false
    Determines whether is an energy producer or not

    question* string
    nullable: false
    Question to send to the bot

}
(Request Body *required)
```

Output
```
{
    description: 
    The data returned after the creation of a new complaint
    
    requestId string
    nullable: false
    Request ID

    id	string
    nullable: false
    Record ID
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

    verificationCode number
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
POST /actions/privacy
Execute a post to send acceptance of the user's privacy
```

Input:
```
email*	string
nullable: false
pattern: ^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
User mail address

accepted*	boolean
nullable: false
Flag to indicate whether the user has accepted or not

```

Output
```
{

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

}
```

Fields Validator Service

```
GET /actions/privacy
Validate a predeterminated field base on related regex
```

Input:
```
fieldName *required
string
(query)
[The field name to validate]

fieldValue *required
string
(query)
[The field name to validate]
```

Output
```
{

}
```


Counter Self Reading
```
POST /actions/counterSelfReading
Execute a post to send a counter self reading
```

Input:
```
requestArea*  string
nullable: false
Area of interest (gas, energy, water)

counterType*  string
nullable: false
Type of counter (digital for energy only, electromechanical for all others)

code*  string
nullable: false
Code of POD/PDR/WATER

value1*  string
nullable: false
Counter value

photo1  string
nullable: true
Photo of counter

value2  string
nullable: true
Counter value

photo2  string
nullable: true
Photo of counter

value3  string
nullable: true
Counter value

photo3  string
nullable: true
Photo of counter

phone*	string
nullable: false
pattern: ^^\\+\\d{7,15}$
User phone number

email*	string
nullable: false
pattern: ^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
User mail address

```

Output
```
{
   id
}
```
