description__0 = 2차원 및 3차원 벡터, 특히 유클리드 (기하학) 벡터를 설명하는 클래스입니다. 벡터는 크기와 방향을 모두 지닌 개체입니다. 하지만, 그 데이터 유형은 벡터의 성분(2D의 경우 x와 y, 3D의 경우 x, y, z)을 저장합니다. 크기와 방향은 각각 mag() 및 heading() 메소드를 통해 접근할 수 있습니다.<br><br>p5.Vector는 위치, 속도, 가속을 다루는 수많은 p5.js 예제에서 사용됩니다. 예를 들어, 화면을 가로질러 움직이는 직사각형을 만들려면, 이 물체의 위치(원점에서 그 위치를 가리키는 벡터), 속도(단위 시간당 객체의 위치가 변하는 속도, 벡터로 표시), 그리고 가속도(단위 시간당 객체의 속도가 변하는 속도, 벡터로 표시)를 반드시 고려해야합니다.<br><br>벡터는 그룹화된 값들을 나타냅니다. 따라서, 전통적인 덧셈/곱셈 대신, p5.Vector 클래스 내부의 벡터 수학 메소드를 사용해서 계산해야 합니다.
params__x = 숫자: 벡터의 x성분 (선택 사항)
params__y = 숫자: 벡터의 y성분 (선택 사항)
params__z = 숫자: 벡터의 z성분 (선택 사항)
x__description__0 = 벡터의 x성분
y__description__0 = 벡터의 y성분
z__description__0 = 벡터의 z성분
set__description__0 = 두 세개의 개별 변수, p5.Vector 데이터, 또는 실수(float) 배열의 값들을 사용하여 벡터의 x, y, z성분을 설정합니다.
copy__description__0 = 벡터의 복사본을 가져와 p5.Vector 객체를 반환합니다.
add__description__0 = x, y, z성분을 벡터에 더하거나, 한 벡터를 다른 벡터에 더하거나, 또는 2개의 독립 벡터를 더합니다. 2개의 독립 벡터를 더하는 메소드는 정적 메소드에 해당하며, p5.Vector를 반환합니다. 다른 메소드들은 벡터에 직접 작용합니다. 자세한 내용은 예제를 참고하세요.
rem__description__0 = 한 벡터를 다른 벡터로 나눈 뒤의 나머지 벡터를 제공합니다. 자세한 내용은 예제를 참고하세요.
sub__description__0 = x, y, z성분을 벡터에서 빼거나, 한 벡터에서 다른 벡터를 빼거나, 또는 2개의 독립 벡터를 뺍니다. 2개의 독립 벡터를 빼는 메소드는 정적 메소드에 해당하며, p5.Vector를 반환합니다. 다른 메소드들은 벡터에 직접 작용합니다. 자세한 내용은 예제를 참고하세요.
mult__description__0 = 벡터에 스칼라를 곱합니다. 정적 메소드인 경우 새로운 p5.Vector를 생성하는 반면, 정적 메소드가 아닌 경우 벡터에 직접 작용합니다. 자세한 내용은 예제를 참고하세요.
mult__params__v0 = p5.Vector
mult__params__v1 = p5.Vector
div__description__0 = 벡터를 스칼라로 나눕니다. 정적 메소드인 경우 새로운 p5.Vector를 생성하는 반면, 정적 메소드가 아닌 경우 벡터에 직접 작용합니다. 자세한 내용은 예제를 참고하세요.
div__params__v0 = p5.Vector
div__params__v1 = p5.Vector
mag__description__0 = 벡터의 크기(길이)를 계산하고 그 결과를 실수(float)으로 반환합니다. (이는 수식 sqrt(x*x + y*y + z*z)과도 같습니다.)
magSq__description__0 = 벡터의 제곱 크기를 계산하고 그 결과를 실수(float)로 반환합니다. (이는 수식 sqrt(x*x + y*y + z*z)과도 같습니다.) 벡터를 비교하는 등의 경우에서 실제 길이를 포함하지 않으면 더 빠르게 계산됩니다.
dot__description__0 = 두 벡터의 내적을 계산합니다. 2개의 독립 벡터의 내적을 계산하는 메소드는 정적 메소드에 해당합니다. 자세한 내용은 예제를 참고하세요.
cross__description__0 = 두 벡터의 외적으로 구성된 벡터를 계산하고 반환합니다. 정적 및 비정적 메소드 모두 새로운 p5.Vector를 반환합니다. 자세한 내용은 예제를 참고하세요.
dist__description__0 = 두 점 사이의 유클리드 거리를 계산합니다 (점을 벡터 객체로 간주).
normalize__description__0 = 벡터를 길이 1로 정규화합니다. (단위 벡터로 만듭니다.)
limit__description__0 = 벡터의 크기를 매개변수 <b>max</b>의 값으로 제한합니다.
setMag__description__0 = 벡터의 크기를 매개변수 <b>len</b>의 값으로 제한합니다.
heading__description__0 = 벡터의 회전 각도를 계산합니다. (2D 벡터만 해당)
rotate__description__0 = 벡터를 특정 각도로 회전하되(2D 벡터만 해당), 크기는 동일하게 유지합니다.
angleBetween__description__0 = 두 벡터 사이의 각도(원주호, radian)를 계산하고 반환합니다.
lerp__description__0 = 한 벡터와 다른 벡터를 선형적으로 보간합니다.
lerp__params__v1 = p5.Vector
lerp__params__v2 = p5.Vector
reflect__description__0 = 2D 선 또는 3D 평면의 법선에 들어오는 벡터를 반영합니다. 이 메소드는 벡터에 직접 작용합니다.
array__description__0 = 벡터의 표현을 실수 배열로 반환합니다. 이는 일시적으로만 사용됩니다. 다른 경우에도, p5.Vector.copy() 메소드를 통해 배열에 내용을 복사해야 합니다.
equals__description__0 = p5.Vector에 대한 평등 검사
fromAngle__description__0 = 특정 각도에서 새로운 2D 벡터를 생성합니다.
random2D__description__0 = 임의의 각도에서 새로운 2D 단위 벡터를 생성합니다.
random3D__description__0 = 새로운 임의의 3D 단위 벡터를 생성합니다.
