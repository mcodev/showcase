import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Avatar, Drawer, Flex, Paper, Rating, Text } from '@mantine/core';

type FavoritesDrawerProps = {
  isVisible: boolean;
  handleCloseDrawer: () => void;
};

const FavoritesDrawer = ({ isVisible, handleCloseDrawer }: FavoritesDrawerProps) => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<any[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

  return (
    <Drawer opened={isVisible} onClose={handleCloseDrawer} title={t('favorites')} padding="xl">
      <Flex direction="column" gap="md">
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => (
            <Paper
              key={favorite.id}
              p="lg"
              onClick={() => {
                handleCloseDrawer();
                router.push(`/${favorite.id}`);
              }}
              className="cursor_pointer"
              radius="md"
              w="100%"
              withBorder
              // shadow="sm"
            >
              <Flex gap="lg">
                <Avatar src={favorite.logoUrl} alt={favorite.name} size={60} radius="xl" />

                <Flex direction="column" gap="2px">
                  <Text size="md" fw={500}>
                    {favorite.name}
                  </Text>

                  <Text size="sm" fw={300}>
                    {favorite.address}
                  </Text>

                  <Rating defaultValue={favorite.rating || 0} readOnly size="10px" fractions={10} />
                </Flex>
              </Flex>
            </Paper>
          ))
        ) : (
          <Flex justify="center" mt="xl">
            <Text>{t('no_favorites')}</Text>
          </Flex>
        )}
      </Flex>
    </Drawer>
  );
};

export default FavoritesDrawer;
