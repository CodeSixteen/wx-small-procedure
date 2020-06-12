Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: './../../images/nezha_movie_img.png',
    typeOne: '节',
    typeTwo: '气',
    text: '斗指巳为芒种，此时可种有芒之谷，过此即失效，故名芒种也。',
    likeCount: 125,
    date: {
      year: '2020',
      month: '六月',
      day: '08'
    },
    isLike: false
  },
  onLike: function() {
    let num = this.data.likeCount
    this.data.isLike ? num-- : num++
    this.setData({
      isLike: !this.data.isLike,
      likeCount: num
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(123);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})