# API-GrowTools
Public API designed to simplify the work of Growtopia Private Server (GTPS) developers.

## API Reference
### Retrieving Item Information [Endpoint: `/info`]
Return item information based on ItemID.

**Example Request:**
```https
  curl -X POST https://api.gtps.pw/info -d "id={ItemID}"
```

**Request Fields**
| Data | Type | Description |
| :--- | :--- | :---------- |
| id | Integer | ItemID |

**Response Fields**
| Key | Type | Description |
| :-- | :--- | :---------- |
| Type | String | Item type |
| Name | String | Item Name |
| Description | String | Item description |
| Properties | Array | Item properties |
| Color | Array | Item color seed |
| Recipe | Object | Recipe to obtain the item |
| Info | String | Additional information |
| URL | String | Growtopia wiki URL |
| Sprite | String | Sprite image URL |
| System | Object | System API message |


### Searching for items in Growtopia wiki [Endpoint: `/search`]
Returns an `Array` of `Objects` with a list of found items.

**Example Request:**
```https
  curl -X POST https://api.gtps.pw/search -d "name={Item Name}"
```

**Request Fields**
| Data | Type | Description |
| :--- | :--- | :---------- |
| name | String | Item Name |

**Response Fields**
Objects within each response Array:
| Key | Type | Description |
| :-- | :--- | :---------- |
| itemName | String | Item Name |
| url | String | Growtopia wiki URL |
| id | Integer | ItemID |
| System | Object | System API message |


### Getting item data from items.dat [Endpoint: `/dat`]
Return an `Object` from item.dat with JSON decoding.

**Example Request:**
```https
  curl -X POST https://api.gtps.pw/dat -d "id={ItemID}"
```

**Request Fields**
| Data | Type | Description |
| :--- | :--- | :---------- |
| id | Integer | ItemID |

**Response Fields**
Objects within each response Array:
| Key | Type | Description |
| :-- | :--- | :---------- |
| item_id | Integer | ItemID |
| editable_type | Integer | - |
| item_category | Integer | - |
| hit_sound_type | Integer | - |
| name | String | Item Name |
| texture | String | Original Name of The Texture File |
| texture_hash | Integer | Texture Hash |
| item_kind | Integer | - |
| val1 | Integer | - |
| texture_x | Integer | Default texture position inside the Texture File |
| texture_y | Integer | Default texture position inside the Texture File |
| spread_type | Integer | - |
| is_stripey_wallpaper | Integer | - |
| collision_type | Integer | - |<
| break_hits | Integer | How much punch needed for breaking the item |
| drop_chance | Integer | - |
| clothing_type | Integer | - |
| rarity | Integer | Item Rarity (999 = din't have Rarity) |
| max_amount | Integer | Maximum item amount |
| extra_file | String | Extra path file |
| extra_file_hash | Integer | Hash of extra file |
| audio_volume | Integer | - |
| pet_name | String | - |
| pet_prefix | String | - |
| pet_suffix | String | - |
| pet_ability | String | - |
| seed_base | Integer | - |
| seed_overlay | Integer | - |
| tree_base | Integer | - |
| tree_leaves | Integer | - |
|  |  |  |
| seed_color | Object | Color Seed |
| *a | Integer | Alpha |
| *r | Integer | Red |
| *g | Integer | Green |
| *b | Integer | Blue |
|  |  |  |
| seed_overlay_color | Object | Overlay Color Seed |
| *a | Integer | Alpha |
| *r | Integer | Red |
| *g | Integer | Green |
| *b | Integer | Blue |
|  |  |  |
| grow_time | Integer | - |
| val2 | Integer | - |
| is_rayman | Integer | - |
| extra_options | String | - |
| texture2 | String | - |
| extra_options2 | String | - |
| data_position_80 | String | - |
| punch_options | String | - |
| data_version_12 | String | - |
| int_version_13 | Integer | - |
| int_version_14 | Integer | - |
| data_version_15 | String | - |
| str_version_15 | String | - |
| str_version_16 | String | - |
| int_version_17 | Integer | - |
| int_version_18 | Integer | - |
| System | Object | System API message |


## Acknowledgements
- [Growtopia-Bot/growtopia-api](https://github.com/Growtopian-Bot/growtopia-api.git)