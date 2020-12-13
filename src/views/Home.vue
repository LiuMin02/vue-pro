<template>
    <Row>
        <Col span='6'>
            <Menu mode="vertical" theme="dark" active-name="shop" @on-select='toPage'>
                <MenuItem name="shop">
                    <Icon type="ios-paper" />
                    商店
                </MenuItem>
                <MenuItem name="store">
                    <Icon type="ios-paper" />
                    个人中心
                </MenuItem>
                <Submenu name="">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        购物车
                    </template>
                    <MenuItem name="cart">购物车</MenuItem>
                    <MenuItem name="cartList">购物车列表</MenuItem>
                    <MenuItem name="lottery">彩票</MenuItem>
                    <MenuItem name="product">商品</MenuItem>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
        </Col>
        <Col>
            home<Button @click="toPage('login')">注销</Button>
            <router-view/>
        </Col>
    </Row>
</template>

<script>

export default {
  name: 'Home',
  methods:{
      toPage(val){
          this.$router.push(val);
      }
  }
}
</script>
