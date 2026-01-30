import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PlatformPressable } from '@react-navigation/elements';
import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(PlatformPressable);

export default function Criar() {
  const scale = useSharedValue(1);
  
  // Estados para controlar o Modal, o texto e a lista de lembretes
  const [modalVisivel, setModalVisivel] = useState(false);
  const [textoLembrete, setTextoLembrete] = useState('');
  const [lembretes, setLembretes] = useState<string[]>([]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const adicionarLembrete = () => {
    if (textoLembrete.trim().length > 0) {
      setLembretes([...lembretes, textoLembrete]); // Adiciona o novo lembrete à lista
      setTextoLembrete(''); // Limpa o campo
      setModalVisivel(false); // Fecha o pop-up
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#4e4c4c' }}
      headerImage={
        <IconSymbol size={250} color="#ffff00" name="calendar" />
        
      }
    >
      <ThemedView style={styles.titulo}>
        <ThemedText type="title">Bem-vindo</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Botão Principal */}
      <AnimatedPressable
        onPressIn={() => (scale.value = withSpring(0.92))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={() => setModalVisivel(true)}
        style={[styles.botao, animatedStyle]}
      >
        <ThemedText style={styles.texto}>Adicionar lembretes</ThemedText>
      </AnimatedPressable>

      {/* Lista de Lembretes Empilhados */}
      <View style={styles.containerLembretes}>
        {lembretes.map((item, index) => (
          <View key={index} style={styles.cardLembrete}>
            <ThemedText style={styles.textoLembrete}>{item}</ThemedText>
          </View>
        ))}
      </View>

      {/* Pop-up (Modal) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <ThemedText style={styles.modalTitulo}>Novo Lembrete</ThemedText>
            
            <TextInput
              style={styles.input}
              placeholder="O que você deseja lembrar?"
              placeholderTextColor="#888"
              value={textoLembrete}
              onChangeText={setTextoLembrete}
              autoFocus
            />

            <View style={styles.botoesModal}>
              <PlatformPressable 
                onPress={() => setModalVisivel(false)} 
                style={[styles.botaoModal, { backgroundColor: '#ff4444' }]}
              >
                <ThemedText style={{ color: '#fff' }}>Cancelar</ThemedText>
              </PlatformPressable>

              <PlatformPressable 
                onPress={adicionarLembrete} 
                style={[styles.botaoModal, { backgroundColor: '#fffb00' }]}
              >
                <ThemedText style={styles.texto}>Criar</ThemedText>
              </PlatformPressable>
            </View>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#fffb00',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  texto: {
    fontWeight: 'bold',
    color: '#221e1e',
  },
  // Estilos da Lista
  containerLembretes: {
    marginTop: 20,
    gap: 10,
  },
  cardLembrete: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#fffb00',
  },
  textoLembrete: {
    color: '#fff',
  },
  // Estilos do Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    color: '#000',
  },
  botoesModal: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoModal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  }
});