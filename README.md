# API-GrowTools
Public API designed to simplify the work of Growtopia Private Server (GTPS) developers.

## API Reference
### Retrieving Item Information [Endpoint: `/info`]
Retrieve item information based on ItemID.

**Example Request:**
```https
  curl -X POST https://api.gtps.pw/info -d "id={ItemID}"
```

**Response Fields**
| Key         | Type     | Description                    |
| :--------   | :------- | :------------------------------|
| Type        | String   | Item type                      |
| Name        | String   | Item Name                      |
| Description | String   | Item description               |
| Properties  | Array    | Item properties                |
| Color       | Array    | Item color seed                |
| Recipe      | Object   | Recipe to obtain the item      |
| Info        | String   | Additional information         |
| URL         | String   | Growtopia wiki URL             |
| Sprite      | String   | Sprite image URL               |
| System      | Object   | System API message             |


### Searching for items in Growtopia wiki [Endpoint: `/search`]
Returns an `Array` of `Objects` with a list of found items.

**Example Request:**
```https
  curl -X POST https://api.gtps.pw/search -d "name={Item Name}"
```

**Response Fields**
Objects within each response Array:
| Key         | Type     | Description                    |
| :---------- | :------- | :------------------------------|
| itemName    | String   | Item Name                      |
| url         | String   | Growtopia wiki URL             |
| System      | Object   | System API message             |
## Acknowledgements
- [Growtopia-Bot/growtopia-api](https://github.com/Growtopian-Bot/growtopia-api.git)