<img src="https://wakeflow.io/wakeflowlogo-only.png" alt="Pulp Fiction Meme" style="width:60px;"/>

# Welcome to the Wakeflow Function Template

This repo allows you to add functionality to our ChatGPT-based personal assistant. 

You can develop and submit your own function and every time someone uses it you earn $0.01.

Here's how it works:

## Instructions
1. clone this repo
2. run `cp .env.example .env`
3. fill in your environment variables in `.env`
4. register yourself as a user
    
    ```
    POST https://api.wakeflow.io/register
     {
       "email":"you@example.com",
       "phone":"+447512345678"
     }
    ```
    which returns:
    ```json
      {
        "success":true,
        "user":{
          "email":"you@example.com",
          "phone":"+447512345678",
          "id":"69d976726ccd671e63f9076c50"
        }
      }
    ```
5. add an endpoint to app.js that describes your function
    e.g. `/getMeme/docs`
    which returns:
    ```json
    {
     "name": "getMeme",
     "description": "returns the url of a meme of the theme the user asked for",
     "parameters": {
       "type": "object",
       "properties": { "theme": { "type": "string" } },
       "required": ["theme"],
     }
     ```
     The above is following a standard called "JSON Schema". You can find further documentation about it [here](https://json-schema.org/learn/getting-started-step-by-step#defining-the-properties).
6. add an endpoint that implements your function
    e.g. `/getMeme/function`
    which returns:
    ```json
      { "url": "https://i.kym-cdn.com/photos/images/original/002/092/391/2b5" }
    ```
7. Make a PR into the `main` branch. 
8. Wait for us to review and publish your code. We'll be in touch by email.
9. Once approved, users of our Personal Assistant would be able to ask something like "Show me a Pulp Fiction meme". Your API would then receive a call like the one below
    ```
    POST https://your.service.url/getMeme/function
    {
      "theme":"Pulp Fiction" 
    }
    ```
    And it would know to respond with 
     ```json
      { "url": "https://i.kym-cdn.com/photos/images/original/002/092/391/2b5" }
    ```
    The end result would look something like this:

    <img src="https://www.wakeflow.io/pulpfiction.png" alt="Pulp Fiction Meme" style="width:200px;"/>


10. You get paid $0.01 per invocation of your function

## OAuth Access
Certain third party services require 0Auth access. 

This is how the user can give you access to their data. For example, to access a user's Gmail account, Google will require the user to grant you access. 

You do not need to implement this OAuth access yourself. Instead you can (and should) use the `wakeflowAccess.js` file in this repo. It exports a function you can use to make API calls that require OAuth access.

For example, imagine you want to list the emails in a user's gmail account. Looking at the documentation (available here: https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list), you see that this requires you to have certain OAuth scopes, namely one of the below:

- `https://mail.google.com/`
- `https://www.googleapis.com/auth/gmail.modify`
- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.metadata`

The same docs show you that you need to make a request to:

`GET https://gmail.googleapis.com/gmail/v1/users/me/messages`

To make this request you can now call:
```javascript
const response = await wakeflowAccess({
  userId:"69d976726ccd671e63f9076c50",
  method:"GET",
  url:"https://gmail.googleapis.com/gmail/v1/users/me/messages",
  scopes:["https://www.googleapis.com/auth/gmail.readonly"]
})
console.log(response.data)
```

Note that in the above we could have picked any of the four scopes. For the example we picked the `readonly` scope because that is the one that grants the least permissions. `https://mail.google.com` would allow you to do a whole lot more, including sending emails on the user's behalf. A user may not want to give you access to do that if you really only need `readonly` access. Therefore you should always use the lowest required level of access for your function. If a future function requires additional access, the user will be guided through granting the additional access.

Also note that here we hardcoded the `userId` you got from your `/register` API call. In production you need to replace this with the `userId` that is sent to you when your function is called. For testing with your own account, you can hard-code it though.

The first time you make this request the `user` may not yet have granted access. If so, you'll get a response like the below:
```json
{
	"statusCode": 401,
	"statusText": "Not Authenticated",
	"message": "You have not yet authorised gmail.googleapis.com on wakeflow. You can do so by visiting this link: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=[...]&approval_prompt=force&response_type=code&redirect_uri=https://api.wakeflow.io/googleOAuth2Callback",
	"success": false
}
```

If that happens you should return a response like the below from your `/function` endpoint:
```json
{
  "error":"You have not yet authorised gmail.googleapis.com on wakeflow. You can do so by visiting this link: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=[...]&approval_prompt=force&response_type=code&redirect_uri=https://api.wakeflow.io/googleOAuth2Callback"
}
```

Our personal assistant will then reply with a message to the user asking them to grant access and try again.

The second time the user calls your function, you'll be able to use `wakeflowAccess` to list their emails.

At the moment, the only OAuth provider that we have integrated with `wakeflowAccess` is Google. That means all Google APIs are available to you. If you would like to use a different OAuth provider, please get in touch with andi@wakeflow.io and he'll get it set up.

## Help & Support

If you get stuck and/or need any support, please don't hesitate to reach out to andi@wakeflow.io and/or WhatsApp +447500172268

---
<img src="https://wakeflow.io/wakeflowlogo-only.png" alt="Pulp Fiction Meme" style="width:60px;"/>

👨‍💻 Visit us on [www.wakeflow.io](https://wakeflow.io) 

💬 Chat with us on [WhatsApp](https://api.whatsapp.com/send?phone=447500172268)

✉️ [Email us](mailto:contact@wakeflow.io)

