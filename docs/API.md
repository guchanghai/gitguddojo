APIs that backend service provides to frontend.

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
