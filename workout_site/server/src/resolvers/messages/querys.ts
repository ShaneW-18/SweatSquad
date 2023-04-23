import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";

export async function get_conversation_by_id(conversationId, offset): Promise<responces.conversationResponce>{
    const responce: responces.conversationResponce = {
        code: 500,
        success: false,
        message: "Internal Server Error",
        conversation: null,
    }
    try{
        const conversation: types.conversation = await knexInstance("conversations").where("conversationId", conversationId).first()
        responce.code = 200
        responce.success = true
        responce.message = "Conversation Found"
        conversation.offset = offset
        responce.conversation = conversation
    }
    catch(err){
        console.log(err)
    }
    return responce;
}