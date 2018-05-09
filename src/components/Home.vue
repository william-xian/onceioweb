<template>
<div>

  <div>
    <div style="text-align: center;">
      <img src="../assets/logo.png" height="100" class="margin: 0 auto;"/>
    </div>
    <div style="text-align: center;">
      <h1><font color="orange">O</font>nce<font color="red">I</font><font color="blue">O</font></h1>
    </div>
    <hr class="my-2"/>
    <div style="text-indent:2em;">
      OnceIO是一个简单高效的数据存储框架，可以粗略的理解成：Hibernate &lt; OnceIO &lt; MyBatis。OnceIO尤其独特的设计，简化操作，利于交流。其特色如下：
    </div>
         <ul>
      <li>
          业务级框架：对标记删除原生支持；对于常量支持与数据库同步。
      </li>
      <li>
          业务级框架：别出心裁国际化处理方式， 不用再为起国际码而头疼，不再为简单的业务折腾数个配置文件，让Coding更加流畅。
      </li>
      <li>
          为变更而设计：独特的SQL拼写方式，告别硬代码，业务变更引起的表结构变更所产生的一系列问题都将在编译期暴露出来。当被问及是否将与某表相关的业务全部更改完毕与否时，纵然百万行代码，也可以轻松的说:Yes，I have done.
      </li>
      <li>
          多表关联查询的硬骨头： 定义式多表关联查询，让多表操作如单表操作一样简单。
      </li>
    </ul>
    <hr class="my-2"/>
    <div style="text-align: center;">
      <b-btn variant="primary" href="https://github.com/william-xian/onceio-test-demo.git">Demo On GitHub</b-btn>
    </div>
  </div>

  <hr class="my-6"/>
  <b-card-group deck
                  class="mb-3">
      <b-card bg-variant="success"
              header="onceio-servlet"
              text-variant="white"
              class="text-center">
          <p class="card-text">OnceIO结合servlet-api 3.0 创建Web应用，最小依赖版本。</p>
          <div slot="footer">
            <b-btn variant="info" href="https://github.com/william-xian/onceio-demo-test.git">ServletAPI Demo</b-btn>
          </div>
      </b-card>
      <b-card bg-variant="dark"
              header="onceio-vertx"
              text-variant="white"
              class="text-center">
          <p class="card-text">OnceIO与vert.x完美结合，基于时间驱动，简单高效。今后将大力支持并晚上该项目。推荐使用该模板做web服务。</p>
          <div slot="footer">
            <b-btn variant="info" href="https://github.com/william-xian/onceio-vertx-demo.git">Vertx Demo</b-btn>
          </div>
      </b-card>
      <b-card bg-variant="primary"
              header="onceio-springboot"
              text-variant="white"
              class="text-center">
          <p class="card-text">OnceIO与SpringBoot结合， 为相应广大用户对SpringBoot需求特意打造。</p>
          <div slot="footer">
            <b-btn variant="info" href="https://github.com/william-xian/onceio-spring-demo.git">SpringBoot Demo</b-btn>
          </div>
      </b-card>
    </b-card-group>
</div>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
