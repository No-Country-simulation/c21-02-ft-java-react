package com.Casinop2p.service;

import com.Casinop2p.entity.RoomEntity;
import com.Casinop2p.entity.SportEventEntity;
import com.Casinop2p.util.BetEnum;

import java.util.List;

public interface SportEventService {

  //  void updateEventResult(Long eventId, BetEnum result);
  List<SportEventEntity> getAllEvents();
}
