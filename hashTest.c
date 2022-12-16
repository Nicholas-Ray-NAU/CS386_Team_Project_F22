// header files
#include "hashTestHeader.h"

unsigned int hashFunction( char* inputPassword, int size );

int main( int argc, char **argv )
   {
      userInfo *hashArray = (userInfo*)malloc(1000*sizeof(userInfo));
      //userInfo *hashArray = (userInfo*)calloc(1000, sizeof(userInfo));

      char password[30];
      int size;
      int index;

      // file I/O, capture password create index/hashID
      strcpy( password, "Thisismypassword123");

      size = strlen( password );

      index = hashFunction( password, size );

      printf("\n%d\n", index);

      // storing data, open file and store in array
      hashArray[index].wins = 1;
      hashArray[index].losses = 2;
      hashArray[index].achievements = 3;
      hashArray[index].name = (char*)malloc(500*sizeof(char));
      strcpy( hashArray[index].name, "Cristian");

      //
      printf("\n%d, %d, %d\n", hashArray[index].wins, hashArray[index].losses,
                                                 hashArray[index].achievements);
      printf("\n%s\n", hashArray[index].name);

      // To check for user, use same hash function, then check if user exists in
      // array already

      free( hashArray );
      free( hashArray[index].name );

      return 0;
   }

unsigned int hashFunction( char* inputPassword, int size )
   {
      int i;
      unsigned int intPassword = 0;
      for( i = 0; i < size; i++ )
         {
            intPassword += (int)(inputPassword[i]);
            intPassword *= (int)(inputPassword[i]);
         }
      intPassword %= 1000;

      /*
      if( intPassword >= 0 && intPassword <= 10 )
         {
            intPassword += 10;
         }
      */

      return intPassword;
   }
