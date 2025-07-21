import {OnboardingStackParamList} from '@/features/onboarding/navigation/OnboardingStack';
import {HomeStackParamList} from '@/features/home/navigation/HomeStack';
import {PremiumStackParamList} from '@/features/premium/navigation/PremiumStack';
import {TicketBookStackParamList} from '@/features/ticket_book/navigation/TicketBookStack';
import {MyStackParamList} from '@/features/my/navigation/MyStack';

export type NavigationProps = OnboardingStackParamList &
  HomeStackParamList &
  PremiumStackParamList &
  TicketBookStackParamList &
  MyStackParamList;
