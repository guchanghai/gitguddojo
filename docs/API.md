APIs that backend service provides to frontend.

<details>

<summary>Users</summary>

<details>

<summary>User register</summary>

**Description：** 

- User register

**Request URL：** 
- ` http://www.gitguddojo.com/api/user/register `
  
**Request Method：**
- POST 

**Parameters：** 

|Parameter|Required|Type|Comment|
|:----    |:---|:----- |-----   |
|username |Y  |string | User name   |
|password |Y  |string | password    |
|name     |N  |string | nick name    |

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

 **Response parameters Description** 

|Parameter|Type|Comment|
|:-----  |:-----|-----                           |
|uid |int   |user ID  |

 **Comments** 

- This API doesn't support Google/Facebook/AppID login

</details> <!-- end of Users section -->

</details>

