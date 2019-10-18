APIs that backend service provides to frontend.

<!-- -------------------------------- User Associated -------------------------------- -->

<details>

<summary>User register</summary>

**Description：** 

- New user registration

**Request URL：** 
- ` http://www.gitguddojo.com/api/user/register `
  
**Request Method：**
- POST 

**Request：** 

|Parameter|Required|Type|Comment|
|:----    |:---|:----- |-----   |
|user_name |Y  |string | User name   |
|password |Y  |string | password    |
|name     |N  |string | nick name    |

 **Request Sample**

``` 
  {
    "user_name": "eirc+user+name",
    "password": "xxxxxxxxxx",
    "name": "Eric
  }
```

 **Response** 

|Parameter|Type|Comment|
|:-----  |:-----|-----                           |
|uid |int   |user ID  |
|token |string   |user access token  |
|reg_time |string   |user register time  |

 **Response Sample**

``` 
  {
    "error_code": 0,
    "data": {
      "uid": "1",
      "token": "user_token_in_base64_encoding",
      "reg_time": "1436864169"
    }
  }
```

 **Comments** 

- This API doesn't support Google/Facebook/AppID register

</details>

<details>

<summary>User login</summary>

**Description：** 

- User login with user and password

**Request URL：** 
- ` http://www.gitguddojo.com/api/user/login `
  
**Request Method：**
- POST 

**Request：** 

|Parameter|Required|Type|Comment|
|:----    |:---|:----- |-----   |
|user_name |Y  |string | User name   |
|password |Y  |string | password    |

 **Request Sample**

``` 
  {
    "user_name": "eirc+user+name",
    "password": "xxxxxxxxxx"
  }
```

**Response** 

|Parameter|Type|Comment|
|:-----  |:-----|----- |
|uid |int   |user ID  |
|token |string   |user access token  |
|last_login_time |string   |last login time|

 **Response Sample**

``` 
  {
    "error_code": 0,
    "data": {
      "uid": "1",
      "token": "user_token_in_base64_encoding",
      "last_login_time": "0"
    }
  }
```

 **Comments** 

- This API doesn't support Google/Facebook/AppID login

</details>

<!-- -------------------------------- User profile -------------------------------- -->

<details>

<summary>User profile</summary>

**Description：** 

- Get detail info of one specific user

**Request URL：** 
- ` http://www.gitguddojo.com/api/user/profile `
  
**Request Method：**
- GET 

**Request：** 

|Parameter|Required|Type|Comment|
|:----    |:---|:----- |-----   |
|user_name |Y  |string | User name   |
|token |Y  |string | User access token    |

 **Request Sample**

``` 
  {
    "user_name": "eirc+user+name",
    "token": "user_token_in_base64_encoding"
  }
```

**Response** 

|Parameter|Type|Comment|
|:-----  |:-----|----- |
|user_name |int   |user name  |
|game_level |string   |user game level  |
|game_role |string   |last game role|

 **Response Sample**

```
  {
    "error_code": 0,
    "data": {
      "user_name": "eric",
      "game_level": "14",
      "game_role": "0"
    }
  }
```

 **Comments** 

- Currently just for current user. But we can expant to all the users

</details>

<!-- -------------------------------- User recommendation -------------------------------- -->

<details>

<summary>User recommendation</summary>

**Description：** 

- Get list of recommended users for the current user

**Request URL：** 
- ` http://www.gitguddojo.com/api/user/recommendation `
  
**Request Method：**
- GET 

**Request：** 

|Parameter|Required|Type|Comment|
|:----    |:---|:----- |-----   |
|user_name |Y  |string | User name   |
|token |Y  |string | User access token    |

 **Request Sample**

``` 
  {
    "user_name": "eirc+user+name",
    "token": "user_token_in_base64_encoding"
  }
```

**Response** 

|Parameter|Type|Comment|
|:-----  |:-----|----- |
|user_name |int   |user name  |
|game_level |string   |user game level  |
|game_role |string   |last game role|

 **Response Sample**

```
  {
    "error_code": 0,
    "data": [{
      "user_name": "eric",
      "game_level": "14",
      "game_role": "0"
    },
    {
      "user_name": "lin",
      "game_level": "13",
      "game_role": "0"
    }
    ]
  }
```

 **Comments** 

- Response data is an array of users

</details>

