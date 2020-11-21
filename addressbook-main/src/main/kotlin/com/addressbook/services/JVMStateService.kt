package com.addressbook.services

import com.addressbook.dto.JavaMetricsDto
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.util.function.Tuple2

import java.time.Duration
import java.util.stream.Stream

@Service
class JVMStateService {
    fun getJVMState(): Flux<JavaMetricsDto> {
        val interval = Flux.interval(Duration.ofSeconds(1))
        val jvmStateFlux = Flux.fromStream(Stream.generate(::JavaMetricsDto))
        return Flux.zip(interval, jvmStateFlux).map(Tuple2<Long, JavaMetricsDto>::getT2)
    }
}
