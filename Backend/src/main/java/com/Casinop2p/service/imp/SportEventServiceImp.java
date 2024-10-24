package com.Casinop2p.service.imp;

import com.Casinop2p.entity.SportEventEntity;
import com.Casinop2p.repository.SportEventRepository;
import com.Casinop2p.service.SportEventService;
import com.Casinop2p.util.BetEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SportEventServiceImp implements SportEventService {


    private final SportEventRepository sportEventRepository;

    /*@Override
    public void updateEventResult(Long eventId, String result) {
        SportEventEntity event = sportEventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + eventId));

        event.setResult(result);
        sportEventRepository.save(event);
    }
*/

}
