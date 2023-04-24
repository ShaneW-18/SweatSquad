import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";

export async function get_conversation_by_id(
  conversationId,
  offset
): Promise<responces.conversationResponce> {
  const responce: responces.conversationResponce = {
    code: 500,
    success: false,
    message: "Internal Server Error",
    conversation: null,
  };
  try {
    const conversation: types.conversation = await knexInstance("conversations")
      .where("conversationId", conversationId)
      .first();
    responce.code = 200;
    responce.success = true;
    responce.message = "Conversation Found";
    conversation.offset = offset;
    responce.conversation = conversation;
  } catch (err) {
    console.log(err);
  }
  return responce;
}
export async function get_messages_since(
  date,
  conversationId
): Promise<responces.messagesResponce> {
    
  date = new Date(parseInt(date,10)).toISOString();

  const responce: responces.messagesResponce = {
    code: 500,
    success: false,
    message: undefined,
    messages: null,
  };
  try {
    const messages:types.message[] = await knexInstance("messages")
      .where("conversationId", conversationId)
      .andWhere("timeSent", ">=", date)
      .andWhere("timeSent", "<=", new Date().toISOString())
      .select("*")
      .orderBy("timeSent", "asc");

    responce.code = 200;
    responce.success = true;
    responce.message = "Messages Found";
    responce.messages = messages;
  } catch (err) {
    console.log(err);
  }
  return responce;
}
