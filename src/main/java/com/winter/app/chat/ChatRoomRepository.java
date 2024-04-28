package com.winter.app.chat;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import jakarta.annotation.PostConstruct;

@Repository
public class ChatRoomRepository {

		private Map<String,ChatRoom> chatRoomMap;

		@PostConstruct
		private void init() {
			chatRoomMap = new LinkedHashMap<>();
		}
		
		public List<ChatRoom> findAllRooms(){
			List<ChatRoom> chatRooms = new ArrayList<>(chatRoomMap.values());
			Collections.reverse(chatRooms);
			return chatRooms;
		}
		
		public ChatRoom findRoomById(String id) {
			return chatRoomMap.get(id);
		}
		
		public ChatRoom createChatRoom(String name) {
			ChatRoom chatRoom = ChatRoom.create(name);
			chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
			return chatRoom;
		}
		
}
