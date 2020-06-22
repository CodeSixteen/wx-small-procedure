const { baseUrl } = require('../../utils/request.js')
const myAudio = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: './../../images/ikon_img.png',
    typeOne: '插',
    typeTwo: '画',
    text: '南方，火也，其帝炎帝，其佐朱明，执衡而治夏；其神为荧惑，其兽朱鸟。',
    likeCount: 125,
    date: {
      year: '2020',
      month: '六月',
      day: '08'
    },
    isLike: false,
    poster: 'https://p1.music.126.net/BeIc-sv62xZPpVBS4DjE-g==/109951164607988464.jpg',
    name: 'Wrap Me In Plastic',
    author: 'CHROMANCE'
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
    wx.request({
      url: baseUrl + 'api',
      method: 'GET',
      data: {
        name: '李万彬',
        age: 18
      },
      success: (res) => {
        // console.log(res.data)
      }
    });
    
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
    myAudio.src = 'https://www.liwanbin.club/static/mp3/WrapMeInPlastic.mp3';
  },
  play: function() {
    myAudio.play();
  },
  stop: function () {
    myAudio.pause();
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