import * as React from 'react';

import { Button, ScrollView, StyleSheet, View } from 'react-native';
import Ahca, {
  CardType,
  CertType,
  DataFormat,
  DataType,
  StatusType,
} from 'react-native-ahca';
import config from '../config.json';

export default function App() {
  console.log('default.App()', Ahca);

  const items = [
    {
      title: '初始化',
      onPress: () => {
        Ahca.init(config.url, config.appKey, config.secretKey);
      },
    },
    {
      title: '配置用户标识',
      onPress: () => {
        Ahca.initUseId(config.userId);
      },
    },
    {
      title: '查询本地证书是否存在',
      onPress: () => {
        Ahca.isLocalCertExist().then(console.log);
      },
    },
    {
      title: '检查证书状态是否正常',
      onPress: () => {
        Ahca.checkCert().then(console.log);
      },
    },
    {
      title: '申请个人证书',
      onPress: () => {
        Ahca.applyPersonalCert({
          userName: config.userName,
          phoneNum: config.phoneNum,
          cardType: CardType.CARD_TYPE_ID_CARD,
          cardNum: config.cardNum,
        }).then(console.log);
      },
    },
    {
      title: '申请企业证书',
      onPress: () => {
        Ahca.applyCompanyCert({}).then(console.log);
      },
    },
    {
      title: '获取更换设备二维码',
      onPress: () => {
        Ahca.getUntieEquipmentQRcode().then(console.log);
      },
    },
    {
      title: '更换设备',
      onPress: () => {
        Ahca.untieEquipment('').then(console.log);
      },
    },
    {
      title: '更新个人证书',
      onPress: () => {
        Ahca.updatePersonalCert({}).then(console.log);
      },
    },
    {
      title: '更新企业证书',
      onPress: () => {
        Ahca.updateCompanyCert({}).then(console.log);
      },
    },
    {
      title: '重置个人证书PIN码',
      onPress: () => {
        Ahca.resetPersonalPIN({}).then(console.log);
      },
    },
    {
      title: '重置企业证书PIN码',
      onPress: () => {
        Ahca.resetCompanyPIN({}).then(console.log);
      },
    },
    {
      title: '修改证书PIN码',
      onPress: () => {
        Ahca.modifyPIN().then(console.log);
      },
    },
    {
      title: '证书登录',
      onPress: async () => {
        Ahca.certLogin(
          '签名原文',
          DataFormat.DATA_FORMAT_DEFAULT,
          DataType.DATA_TYPE_ORIGINAL,
          ''
        ).then(console.log);
      },
    },
    {
      title: '证书签章',
      onPress: () => {
        Ahca.certSeal('').then(console.log);
      },
    },
    {
      title: '证书签名',
      onPress: () => {
        Ahca.certSign(
          '签名原文',
          DataFormat.DATA_FORMAT_DEFAULT,
          DataType.DATA_TYPE_ORIGINAL,
          ''
        ).then(console.log);
      },
    },
    {
      title: '证书验签',
      onPress: () => {
        Ahca.certVerifySign(
          '签名原文',
          DataFormat.DATA_FORMAT_DEFAULT,
          '签名结果',
          DataType.DATA_TYPE_ORIGINAL
        ).then(console.log);
      },
    },
    {
      title: '证书加密',
      onPress: () => {
        Ahca.certEncrypt(
          '加密原文',
          DataFormat.DATA_FORMAT_DEFAULT,
          DataType.DATA_TYPE_ORIGINAL
        ).then(console.log);
      },
    },
    {
      title: '证书解密',
      onPress: () => {
        Ahca.certDecrypt(
          '加密结果',
          DataFormat.DATA_FORMAT_DEFAULT,
          DataType.DATA_TYPE_ORIGINAL,
          ''
        ).then(console.log);
      },
    },
    {
      title: '变更证书状态(冻结)',
      onPress: () => {
        Ahca.changeCertStatus(StatusType.CERT_STATUS_TYPE_FREEZE).then(
          console.log
        );
      },
    },
    {
      title: '变更证书状态(解冻)',
      onPress: () => {
        Ahca.changeCertStatus(StatusType.CERT_STATUS_TYPE_UNFREEZE).then(
          console.log
        );
      },
    },
    {
      title: '延期证书',
      onPress: () => {
        Ahca.postponeCert().then(console.log);
      },
    },
    {
      title: '修改PIN缓存时间',
      onPress: () => {
        Ahca.setPrivateKeyCacheTime('').then(console.log);
      },
    },
    {
      title: '清除PIN缓存时间',
      onPress: () => {
        Ahca.clearPKCacheTime('').then(console.log);
      },
    },
    {
      title: '保存签名图片（弹出签名面板）',
      onPress: () => {
        Ahca.setSignImgWithDrawingBoard({}).then(console.log);
      },
    },
    {
      title: '获取/保存签名图片（永久性数据）',
      onPress: () => {
        Ahca.getSignImgAndSetItIfNotExist({}).then(console.log);
      },
    },
    {
      title: '获取签名图片（永久性数据）',
      onPress: () => {
        Ahca.getSignImgFromService().then(console.log);
      },
    },
    {
      title: '获取签名图片（一次性数据）',
      onPress: () => {
        Ahca.getSignImgWithDrawingBoard({}).then(console.log);
      },
    },
    {
      title: '获取证书',
      onPress: () => {
        Ahca.getCert(CertType.CERT_TYPE_SIGNCERT).then(console.log);
      },
    },
    {
      title: '获取单位编号列表',
      onPress: () => {
        Ahca.getDepartmentNo().then(console.log);
      },
    },
    {
      title: '下载预制证书',
      onPress: () => {
        Ahca.downloadCert('', '', CertType.CERT_TYPE_SIGNCERT).then(
          console.log
        );
      },
    },
    {
      title: '清理本地证书',
      onPress: () => {
        Ahca.clearCert().then(console.log);
      },
    },
    {
      title: '查询生物识别启用状态',
      onPress: () => {
        Ahca.getFingerprintStatus().then(console.log);
      },
    },
    {
      title: '开启/关闭生物识别',
      onPress: () => {
        Ahca.openFingerprint(true).then(console.log);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item, index) => (
          <Button key={index} title={item.title} onPress={item.onPress} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
