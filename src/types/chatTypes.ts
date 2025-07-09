// types/chatTypes.ts

export interface Message {
    message_id: number;
    content: string;
    sent_at: string;
    sender: number | null;
    sender_username: string | null;
  }
  
  export interface Participant {
    participant_id: number;
    user: number | null;
    username: string | null;
    joined_at: string;
  }
  
  export interface Chat {
    chat_id: number;
    created_by: number;
    created_at: string;
    latest_message: Message | null;
    participants: Participant[];
    creator_username:string;
  }
  