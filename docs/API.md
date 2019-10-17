APIs that backend service provides to frontend.

<details>

<summary>User register</summary>

**Description：** 

- New user registeration

**Request URL：** 
- ` http://www.gitguddojo.com/api/user/register `
  
**Request Method：**
- POST 

**Request：** 

|Parameter|Required|Type|Comment|
|:----    |:---|:----- |-----   |
|username |Y  |string | User name   |
|password |Y  |string | password    |
|name     |N  |string | nick name    |

 **Request Sample**

``` 
  {
    "userName": "eirc+user+name",
    "password": "xxxxxxxxxx",
    "name": "Eric
  }
```

 **Response** 

|Parameter|Type|Comment|
|:-----  |:-----|-----                           |
|uid |int   |user ID  |

 **Response Sample**

``` 
  {
    "error_code": 0,
    "data": {
      "uid": "1",
      "username": "12154545",
      "name": "Eric",
      "reg_time": "1436864169",
      "last_login_time": "0",
    }
  }
```

 **Comments** 

- This API doesn't support Google/Facebook/AppID login

</details>
