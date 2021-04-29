import { NativeModules } from 'react-native';

type AhcaType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Ahca } = NativeModules;

export default Ahca as AhcaType;
