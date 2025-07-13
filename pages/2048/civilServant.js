// 公务员职级映射
function CivilServant() {
  // 公务员职级序列（从低到高）
  this.levels = {
    1: '二级科员',
    2: '一级科员', 
    3: '四级主任科员',
    4: '三级主任科员',
    5: '二级主任科员',
    6: '一级主任科员',
    7: '四级调研员',
    8: '三级调研员',
    9: '二级调研员',
    10: '一级调研员',
    11: '二级巡视员',
    12: '一级巡视员'
  };
  
  // 职级对应的级别范围
  this.gradeRanges = {
    1: '二十七级至十九级',
    2: '二十六级至十八级',
    3: '二十四级至十八级',
    4: '二十三级至十七级',
    5: '二十二级至十六级',
    6: '二十一级至十五级',
    7: '二十级至十四级',
    8: '十九级至十三级',
    9: '十八级至十二级',
    10: '十七级至十一级',
    11: '十五级至十级',
    12: '十三级至八级'
  };
}

CivilServant.prototype = {
  // 获取职级名称
  getLevelName(level) {
    return this.levels[level] || '';
  },
  
  // 获取职级对应的级别范围
  getGradeRange(level) {
    return this.gradeRanges[level] || '';
  },
  
  // 获取最高职级
  getMaxLevel() {
    return 12;
  },
  
  // 检查是否为有效职级
  isValidLevel(level) {
    return level >= 1 && level <= 12;
  }
};

module.exports = CivilServant;