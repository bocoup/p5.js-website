description__0 = 오디오/비디오 처리를 위해 p5.Element를 확장합니다. p5.Element의 메소드 뿐 아니라, 미디어 제어를 위한 메소드도 포함합니다. p5.MediaElements는 직접 호출되지 않지만, createVideo, createAudio, CreateCapture 호출을 통해 생성됩니다.
params__elt = 문자열: 래핑된 DOM 노드
src__description__0 = 미디어 요소 소스 경로
play__description__0 = HTML5 미디어 요소를 재생합니다.
stop__description__0 = HTML5 미디어 요소를 중지합니다. (현재 시간을 0으로 설정)
pause__description__0 = HTML5 미디어 요소를 일시정지합니다.
loop__description__0 = HTML5 미디어 요소의 반복을 참(true)로 설정하고, 재생 시작합니다.
noLoop__description__0 = HTML5 미디어 요소의 반복을 거짓(false)으로 설정합니다. 종료 시점에 도달하면 요소가 중지합니다.
autoplay__description__0 = HTML5 미디어 요소 자동재생 여부 설정
volume__description__0 = HTML5 미디어 요소의 볼륨을 설정합니다. 별도로 지정한 인수가 없으면, 현재 볼륨을 반환합니다.
speed__description__0 = 별도로 지정한 인수가 없으면, 요소의 현재 재생 속도를 반환하빈다. 속도 매개변수는 2.0일 때 2배속으로, 0.5일 때 0.5배속으로, -1일 때 정상 속도로 역재생합니다. (모든 브라우저가 역재생을 지원하지 않으며, 일부 지원 브라우저에서도 부드럽게 재생되지 않을 수 있습니다.)
time__description__0 = 별도로 지정한 인수가 없을 경우, 요소의 현재 시간을 반환합니다. 인수가 지정될 경우, 요소의 현재 시간이 해당 인수로 설정됩니다.
duration__description__0 = HTML5 미디어 요소의 지속 시간을 반환합니다.
onended__description__0 = 오디오/비디오 요소가 종료 시점에 도달할 때 호출할 이벤트를 예약합니다. 요소가 반복하는 경우 호출되지 않습니다. 요소는 oneded 콜백에 인수로 전달됩니다.
connect__description__0 = 요소가 출력한 오디오를 특정 audioNode나 p5.sound 객체로 보냅니다. 요소가 없는 경우, p5의 마스터 출력에 연결합니다. 모든 연결은 .disconnect() 메소드로 제거할 수 있습니다. p5.sound.js 애드온 라이브러리로 이러한 방법을 사용할 수 있습니다.
disconnect__description__0 = 마스터 출력을 비롯하여 모든 웹 오디오 라우팅을 분리합니다. 사용 예: 오디오 효과를 통해 출력을 다시 라우팅할 때
showControls__description__0 = 웹 브라우저가 지정한 기본 미디어 요소(MediaElement) 컨트롤을 나타냅니다.
hideControls__description__0 = 기본 미디어 요소(MediaElement) 컨트롤을 숨깁니다.
addCue__description__0 = 오디오/비디오와 같은 미디어 요소(MediaElement)가 재생 큐 지점에 도달할 때 발생할 이벤트를 예약합니다. 콜백 함수, 콜백이 발생할 시간(초 단위), 콜백에 대한 선택적 매개변수를 허용합니다. 1번째 매개변수는 시간(time)을, 2번째 매개변수는 param을 콜백 함수에 전달합니다.
removeCue__description__0 = ID를 기반으로 콜백을 제거합니다. ID는 addCue 메소드로 반환됩니다.
clearCues__description__0 = addCue 메소드로 예약된 모든 콜백을 제거합니다.
