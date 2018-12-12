<body>
    <div id="app">
      <section>
        <h1>기초대사 계산</h1>
        <div>
          <select id="gender">
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          <input v-model="height" placeholder="신장 (cm)" />
          <input v-model="weight" placeholder="체중 (kg)" />
          <input v-model="age" placeholder="나이" />
        </div>
        <h1>당신의 기초대사량은 {{ bmr }} {{ unit }} 입니다.</h1>
        <!--
          남성 기초대사 = 10 * 체중 + 6.25 * 신장 -5 * 나이 + 5
          여성 기초대사 = 10 * 체중 + 6.25 * 신장 -5 * 나이 - 161
        -->
      </section>
      <section>
        <h1>활동 대사</h1>
        <select v-model="activityLevel">
          <option disabled value="">선택하세요</option>
          <option value="low">낮음</option>
          <option value="mid">약간 높음</option>
          <option value="high">높음</option>
        </select>
        <h1>당신의 적정 활동대사량은 {{ amr + unit }} 입니다.</h1>
        <!--
          활동레벨 낮음 = 기초대사 * 1.2
          활동레벨 약간 높음 = 기초대사 * 1.55
          활동레벨 높음 = 기초대사 * 1.725
        -->
      </section>
      <section>
        <h1>목적에 맞춘 칼로리 설정</h1>
        <input type="radio"  name="goal" value="bulkup">근육을 늘린다.
        <input type="radio"  name="goal" value="stay">현상유지를 한다.
        <input type="radio"  name="goal" value="lose">감량한다.
        <!--
          칼로리를 늘린다 = 하루 소비 칼로리 * 1.2
          현상유지 = 하루 소비 칼로리 * 1
          감량한다 = 하루 소비 칼로리 * 0.8
        -->
      </section>
    </div>
    
    <script>
      // You can also require other files to run in this process
      require('./renderer.js')
    </script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: '#app',
        data: {
          gender: 'male',
          height: 160,
          weight: 60,
          age: 20,
          activityLevel: 'mid',
          goal: 'stay',
          unit: 'Kcal'
        },
        computed: {
          bmr() {
            if(gender === 'male')
              return 10 * this.weight + 6.25 * this.height -5 * this.age + 5;
            return 10 * this.weight + 6.25 * this.height -5 * this.age -161;

          },
          amr() {
            switch(this.activityLevel) {
              case 'low':
                return this.bmr * 1.2;
              case 'mid':
                return this.bmr * 1.55;
              default:
                return this.bmr * 1.725;
            }
          },
          targetCalory() {
            switch(this.goal) {
              case 'lose':
                return this.bmr * 0.8;
              case 'stay':
                return this.bmr * 1;
              default:
                return this.this.bmr * 1.2;
            }
          }
        }
      });
    </script>
  </body>
