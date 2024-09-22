const { addCommand } = require("../router/registered");

var items_secret_key = "PBG892FXX982ABC*"
var data_json = {}
var encoded_buffer_file = [];
const byteToHex = [];

let msg = "";

for (let n = 0; n <= 0xff; ++n) {
    const hexOctet = n.toString(16).padStart(2, "0");
    byteToHex.push(hexOctet);
}

function hash_buffer(buffer, element, text) {
    var hash = 0x55555555;
    var toBuffer = new Uint8Array(buffer);
    for (let a = 0; a < toBuffer.length; a++) hash = (hash >>> 27) + (hash << 5)
    + toBuffer[a];
    msg = text + hash
}

function process_item_encoder(result, using_txt) {
    var mem_pos = 6;

    if (using_txt) {
        var version = 0;
        result = result.split("\n");

        for (let a = 0; a < result.length; a++) {
            var result1 = result[a].split("\\")
            if (result1[0] == "version") {
                version = Number(result1[1])
                write_buffer_number(0, 2, Number(result1[1]))
            }
            else if (result1[0] == "itemCount") write_buffer_number(2, 4, Number(result1[1]))
            else if (result1[0] == "add_item") {
                // item id
                write_buffer_number(mem_pos, 4, result1[1]);
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[2]); // editable type
                encoded_buffer_file[mem_pos++] = Number(result1[3]); // item category
                encoded_buffer_file[mem_pos++] = Number(result1[4]); // action type
                encoded_buffer_file[mem_pos++] = Number(result1[5]); // hit sound type
                
                // name
                write_buffer_number(mem_pos, 2, result1[6].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[6].length, result1[6], 1, Number(result1[1]))
                mem_pos += result1[6].length

                // texture
                write_buffer_number(mem_pos, 2, result1[7].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[7].length, result1[7])
                mem_pos += result1[7].length

                // texture hash
                write_buffer_number(mem_pos, 4, result1[8])
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[9]) // item kind

                // val1
                write_buffer_number(mem_pos, 4, result1[10])
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[11]) // texture x
                encoded_buffer_file[mem_pos++] = Number(result1[12]) // texture y
                encoded_buffer_file[mem_pos++] = Number(result1[13]) // spread type
                encoded_buffer_file[mem_pos++] = Number(result1[14]) // is stripey wallpaper
                encoded_buffer_file[mem_pos++] = Number(result1[15]) // collision type
                
                // break hits
                if (result1[16].includes("r")) encoded_buffer_file[mem_pos++] = Number(result1[16].slice(0, -1))
                else encoded_buffer_file[mem_pos++] = Number(result1[16]) * 6

                // drop chance
                write_buffer_number(mem_pos, 4, result1[17])
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[18]) // clothing type
                
                // rarity
                write_buffer_number(mem_pos, 2, result1[19])
                mem_pos += 2;

                encoded_buffer_file[mem_pos++] = Number(result1[20]) // max amount
                
                // extra file
                write_buffer_number(mem_pos, 2, result1[21].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[21].length, result1[21])
                mem_pos += result1[21].length

                // extra file hash
                write_buffer_number(mem_pos, 4, result1[22])
                mem_pos += 4;

                // audio volume
                write_buffer_number(mem_pos, 4, result1[23])
                mem_pos += 4;

                // pet name
                write_buffer_number(mem_pos, 2, result1[24].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[24].length, result1[24])
                mem_pos += result1[24].length

                // pet prefix
                write_buffer_number(mem_pos, 2, result1[25].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[25].length, result1[25])
                mem_pos += result1[25].length

                // pet suffix
                write_buffer_number(mem_pos, 2, result1[26].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[26].length, result1[26])
                mem_pos += result1[26].length

                // pet ability
                write_buffer_number(mem_pos, 2, result1[27].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[27].length, result1[27])
                mem_pos += result1[27].length

                encoded_buffer_file[mem_pos++] = Number(result1[28]) // seed base
                encoded_buffer_file[mem_pos++] = Number(result1[29]) // seed overlay
                encoded_buffer_file[mem_pos++] = Number(result1[30]) // tree base
                encoded_buffer_file[mem_pos++] = Number(result1[31]) // tree leaves

                // seed color (ARGB)
                var to_object = result1[32].split(",")
                encoded_buffer_file[mem_pos++] = to_object[0] // seed color (A)
                encoded_buffer_file[mem_pos++] = to_object[1] // seed color (R)
                encoded_buffer_file[mem_pos++] = to_object[2] // seed color (G)
                encoded_buffer_file[mem_pos++] = to_object[3] // seed color (B)

                // seed overlay color (ARGB)
                to_object = result1[33].split(",")
                encoded_buffer_file[mem_pos++] = to_object[0] // seed color overlay (A)
                encoded_buffer_file[mem_pos++] = to_object[1] // seed color overlay (A)
                encoded_buffer_file[mem_pos++] = to_object[2] // seed color overlay (A)
                encoded_buffer_file[mem_pos++] = to_object[3] // seed color overlay (A)
                
                // ingredients (Skip)
                write_buffer_number(mem_pos, 4, 0);
                mem_pos += 4;

                // grow time
                write_buffer_number(mem_pos, 4, result1[34]); 
                mem_pos += 4;

                // val2
                write_buffer_number(mem_pos, 2, result1[35]); 
                mem_pos += 2;

                // is rayman
                write_buffer_number(mem_pos, 2, result1[36]); 
                mem_pos += 2;

                // extra options
                write_buffer_number(mem_pos, 2, result1[37].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[37].length, result1[37])
                mem_pos += result1[37].length
                
                // texture2
                write_buffer_number(mem_pos, 2, result1[38].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[38].length, result1[38])
                mem_pos += result1[38].length

                // extra options2
                write_buffer_number(mem_pos, 2, result1[39].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[39].length, result1[39])
                mem_pos += result1[39].length

                // Data (Position 80)
                hexStringToArrayBuffer(mem_pos, result1[40])
                mem_pos += 80;

                if (version >= 11) {
                    // punch options
                    write_buffer_number(mem_pos, 2, result1[41].length);
                    mem_pos += 2;
                    write_buffer_string(mem_pos, result1[41].length, result1[41])
                    mem_pos += result1[41].length
                }
                if (version >= 12) {
                    hexStringToArrayBuffer(mem_pos, result1[42])
                    mem_pos += 13;
                }
                if (version >= 13) {
                    write_buffer_number(mem_pos, 4, result1[43])
                    mem_pos += 4;
                }
                if (version >= 14) {
                    write_buffer_number(mem_pos, 4, result1[44])
                    mem_pos += 4;
                }
                if (version >= 15) {
                    hexStringToArrayBuffer(mem_pos, result1[45])
                    mem_pos += 25;
                    write_buffer_number(mem_pos, 2, result1[46].length);
                    mem_pos += 2;
                    write_buffer_string(mem_pos, result1[46].length, result1[46])
                    mem_pos += result1[46].length
                }
                if (version >= 16) {
                    write_buffer_number(mem_pos, 2, result1[47].length);
                    mem_pos += 2;
                    write_buffer_string(mem_pos, result1[47].length, result1[47])
                    mem_pos += result1[47].length
                }
                if (version >= 17) {
                    write_buffer_number(mem_pos, 4, result1[48])
                    mem_pos += 4;
                }
                if (version >= 18) {
                    write_buffer_number(mem_pos, 4, result1[49])
                    mem_pos += 4;
                }
            }
        }
    } else {
        write_buffer_number(0, 2, result.version)
        write_buffer_number(2, 4, result.item_count)
        for (let a = 0; a < result.item_count; a++) {
            write_buffer_number(mem_pos, 4, result.items[a].item_id);
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].editable_type
            encoded_buffer_file[mem_pos++] = result.items[a].item_category
            encoded_buffer_file[mem_pos++] = result.items[a].action_type
            encoded_buffer_file[mem_pos++] = result.items[a].hit_sound_type
            write_buffer_number(mem_pos, 2, result.items[a].name.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].name.length, result.items[a].name, 1, result.items[a].item_id)
            mem_pos += result.items[a].name.length
            write_buffer_number(mem_pos, 2, result.items[a].texture.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].texture.length, result.items[a].texture)
            mem_pos += result.items[a].texture.length
            write_buffer_number(mem_pos, 4, result.items[a].texture_hash)
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].item_kind
            write_buffer_number(mem_pos, 4, result.items[a].val1)
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].texture_x
            encoded_buffer_file[mem_pos++] = result.items[a].texture_y
            encoded_buffer_file[mem_pos++] = result.items[a].spread_type
            encoded_buffer_file[mem_pos++] = result.items[a].is_stripey_wallpaper
            encoded_buffer_file[mem_pos++] = result.items[a].collision_type

            if (check_last_char(result.items[a].break_hits.toString(), "r")) encoded_buffer_file[mem_pos++] = Number(result.items[a].break_hits.toString().slice(0, -1))
            else encoded_buffer_file[mem_pos++] = Number(result.items[a].break_hits) * 6

            write_buffer_number(mem_pos, 4, result.items[a].drop_chance)
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].clothing_type
            write_buffer_number(mem_pos, 2, result.items[a].rarity)
            mem_pos += 2;
            
            encoded_buffer_file[mem_pos++] = result.items[a].max_amount
            write_buffer_number(mem_pos, 2, result.items[a].extra_file.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].extra_file.length, result.items[a].extra_file)
            mem_pos += result.items[a].extra_file.length
            write_buffer_number(mem_pos, 4, result.items[a].extra_file_hash)
            mem_pos += 4;
            write_buffer_number(mem_pos, 4, result.items[a].audio_volume)
            mem_pos += 4;
            write_buffer_number(mem_pos, 2, result.items[a].pet_name.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_name.length, result.items[a].pet_name)
            mem_pos += result.items[a].pet_name.length
            write_buffer_number(mem_pos, 2, result.items[a].pet_prefix.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_prefix.length, result.items[a].pet_prefix)
            mem_pos += result.items[a].pet_prefix.length
            write_buffer_number(mem_pos, 2, result.items[a].pet_suffix.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_suffix.length, result.items[a].pet_suffix)
            mem_pos += result.items[a].pet_suffix.length
            write_buffer_number(mem_pos, 2, result.items[a].pet_ability.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_ability.length, result.items[a].pet_ability)
            mem_pos += result.items[a].pet_ability.length
            encoded_buffer_file[mem_pos++] = result.items[a].seed_base
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay
            encoded_buffer_file[mem_pos++] = result.items[a].tree_base
            encoded_buffer_file[mem_pos++] = result.items[a].tree_leaves
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.a
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.r
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.g
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.b
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.a
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.r
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.g
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.b
            write_buffer_number(mem_pos, 4, 0); // skipping ingredients
            mem_pos += 4;
            write_buffer_number(mem_pos, 4, result.items[a].grow_time);
            mem_pos += 4;
            write_buffer_number(mem_pos, 2, result.items[a].val2);
            mem_pos += 2;
            write_buffer_number(mem_pos, 2, result.items[a].is_rayman);
            mem_pos += 2;
            write_buffer_number(mem_pos, 2, result.items[a].extra_options.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].extra_options.length, result.items[a].extra_options)
            mem_pos += result.items[a].extra_options.length
            write_buffer_number(mem_pos, 2, result.items[a].texture2.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].texture2.length, result.items[a].texture2)
            mem_pos += result.items[a].texture2.length
            write_buffer_number(mem_pos, 2, result.items[a].extra_options2.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].extra_options2.length, result.items[a].extra_options2)
            mem_pos += result.items[a].extra_options2.length
            hexStringToArrayBuffer(mem_pos, result.items[a].data_position_80)
            mem_pos += 80;
            if (result.version >= 11) {
                write_buffer_number(mem_pos, 2, result.items[a].punch_options.length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result.items[a].punch_options.length, result.items[a].punch_options)
                mem_pos += result.items[a].punch_options.length
            }
            if (result.version >= 12) {
                hexStringToArrayBuffer(mem_pos, result.items[a].data_version_12)
                mem_pos += 13;
            }
            if (result.version >= 13) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_13)
                mem_pos += 4;
            }
            if (result.version >= 14) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_14)
                mem_pos += 4;
            }
            if (result.version >= 15) {
                hexStringToArrayBuffer(mem_pos, result.items[a].data_version_15)
                mem_pos += 25;
                write_buffer_number(mem_pos, 2, result.items[a].str_version_15.length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result.items[a].str_version_15.length, result.items[a].str_version_15)
                mem_pos += result.items[a].str_version_15.length
            }
            if (result.version >= 16) {
                write_buffer_number(mem_pos, 2, result.items[a].str_version_16.length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result.items[a].str_version_16.length, result.items[a].str_version_16)
                mem_pos += result.items[a].str_version_16.length
            }
            if (result.version >= 17) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_17)
                mem_pos += 4;
            }
            if (result.version >= 18) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_18)
                mem_pos += 4;
            }
        }
    }
};

function item_encoder(file, txt = false, using_editor = false) {
    if (using_editor) {
        process_item_encoder(data_json, 0);
        saveDataBuffer(encoded_buffer_file, "items.dat")
        hash_buffer(encoded_buffer_file, "items_dat_hash_2", "Encoded Items dat Hash: ")
        return encoded_buffer_file = []
    } else {
        try {
            encoded_buffer_file = [];
            if (txt) process_item_encoder(file, 1)
            else process_item_encoder(JSON.parse(file), 0) 

            hash_buffer(encoded_buffer_file, "items_dat_hash_1", "Encoded Items dat Hash: ")
            return encoded_buffer_file;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }
}

addCommand("jsonDat", async (data) => {
    try {
        data = data[0];
        if (!data.buffer) {
            throw new Error("No buffer provided.");
        }
        
        
        const jsonData = item_encoder(data.buffer.toString("utf-8")); //.toString("utf-8");

        return jsonData;
    } catch (error) {
        return { "System": `Error processing JSON: ${error.message}` };
    }
})