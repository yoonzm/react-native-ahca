package com.reactnativeahca;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Utils {
  /**
   * 将java实体转为rn实体
   * @param key
   * @param object
   * @param map
   * @param array
   */
  static private void toWritableData(String key, Object object, WritableMap map, WritableArray array) {
    if (object instanceof Integer) {
      if (map != null) {
        map.putInt(key, (Integer)object);
      }
      if (array != null) {
        array.pushInt((Integer)object);
      }
    } else if (object instanceof String) {
      if (map != null) {
        map.putString(key, (String) object);
      }
      if (array != null) {
        array.pushString((String) object);
      }
    } else if (object instanceof ArrayList) {
      WritableArray innerArray = Arguments.createArray();
      for (int i = 0; i < ((ArrayList) object).size(); i++) {
        toWritableData(null, ((ArrayList) object).get(i), null, innerArray);
      }
      if (map != null) {
        map.putArray(key, innerArray);
      }
      if (array != null) {
        array.pushArray(innerArray);
      }
    } else if (object instanceof HashMap) {
      WritableMap innerParams = Arguments.createMap();
      for (Object innerKey : ((HashMap) object).keySet()) {
        toWritableData((String)innerKey, ((HashMap) object).get((String)innerKey), innerParams, null);
      }
      if (map != null) {
        map.putMap(key, innerParams);
      }
      if (array != null) {
        array.pushMap(innerParams);
      }
    } else {
      if (map != null) {
        map.putString(key, object.toString());
      }
      if (array != null) {
        array.pushString(object.toString());
      }
    }
  }

  /**
   * 通用返回结果处理
   */
  static void commonResponseHandle(final Promise promise, Object obj) {
    Map map = (Map) JSON.parse(JSON.toJSONString(obj));
    WritableMap writableMap = Arguments.createMap();
    if (map != null) {
      for (Object key : map.keySet()) {
        toWritableData((String)key, map.get((String)key), writableMap, null);
      }
    }
    promise.resolve(writableMap);
  }
}
